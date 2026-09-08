/* eslint-disable @typescript-eslint/no-require-imports -- Isolated CommonJS test harness for server modules. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Run the real TypeScript modules with isolated dependencies. Never sends mail or writes live storage.
function load(path, mocks = {}) {
  const code = ts.transpileModule(fs.readFileSync(path,'utf8'), { compilerOptions: { module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022 } }).outputText;
  const loaded={exports:{}};
  new Function('require','module','exports',code)(name => name in mocks ? mocks[name] : require(name),loaded,loaded.exports);
  return loaded.exports;
}
const siteData=load('src/lib/site.ts');
const enquiryContext=load('src/lib/enquiry-context.ts',{'./site':siteData});
const rfq=load('src/lib/rfq.ts',{'./enquiry-context':enquiryContext});
const sample={requestType:'enquiry',firstName:'Example Buyer',company:'Example Marine',email:'buyer@example.com',preferredContact:'Email',message:'Please send information about vessel provisions.'};
const catalogueFile=enquiryContext.catalogueDirectory[0].file;
test('catalogue context resolves trusted titles and rejects forged URLs, duplicates and excessive lists',()=>{
  const selection={file:catalogueFile,detail:'Page 12, code ABC',quantity:'2 packs',title:'Forged title'};
  const parsed=enquiryContext.parseCatalogueSelections([selection]);
  assert.equal(parsed.items[0].title,enquiryContext.catalogueDirectory[0].title);
  for(const value of ['bad JSON',{},[{...selection,file:'https://attacker.example/file.pdf'}],[selection,selection],Array(11).fill(selection),[{...selection,detail:'x'.repeat(301)}]])assert.ok(enquiryContext.parseCatalogueSelections(value).error);
  assert.equal(enquiryContext.parseCatalogueSelections([{...selection,detail:'Page '}]).items[0].detail,'Page ');
});
test('a catalogue alone needs an item detail; a described item can replace the message',()=>{
  const data={...sample,requestType:'quote',category:'Technical stores',message:'',catalogueSelections:[{file:catalogueFile,detail:'',quantity:''}]};
  assert.ok(rfq.parseContact(data,false).error);
  data.catalogueSelections[0].detail='Part ABC';assert.ok(rfq.parseContact(data,false).fields);
  assert.ok(rfq.parseContact({...sample,sourceContext:'invented-office'},false).error);
});
test('catalogue notes and multi-location scope remain escaped in operations mail',()=>{
  const fields=rfq.parseContact({...sample,sourceContext:'planned-maintenance',multiLocation:'Walvis Bay\nCape Town',catalogueSelections:[{file:catalogueFile,detail:'Part <script>x</script>',quantity:'2 × 20 litres'}]},false).fields;
  const email=rfq.buildRfqEmail(fields,'RFQ-DEMO','2026-09-08T08:00:00Z');
  assert.ok(!email.html.includes('<script>'));assert.ok(email.html.includes('&lt;script&gt;'));
  assert.match(email.text,/CATALOGUE REFERENCES/);assert.match(email.text,/2 × 20 litres/);assert.match(email.text,/Walvis Bay\nCape Town/);assert.match(email.text,/Planned maintenance/);
});
test('screenshot scenario: no silent WhatsApp preference, and no invented service',()=>{
  const {fields}=rfq.parseContact({...sample,preferredContact:undefined},false);
  assert.equal(fields.preferredContact,'Email');assert.equal(fields.category,'');assert.equal(fields.requestType,'enquiry');
  assert.match(rfq.buildRfqEmail(fields,'ENQ-DEMO','2026-09-08T08:00:00Z').subject,/General enquiry/);
});
test('WhatsApp or phone requires a valid international number',()=>{
  for(const preferredContact of ['WhatsApp','Phone call']) {
    for(const phone of ['', 'unknown', '0000', '0811413840']) assert.ok(rfq.parseContact({...sample,preferredContact,phone},false).error);
    assert.ok(rfq.parseContact({...sample,preferredContact,phone:'+264 81 123 4567'},false).fields);
  }
});
test('email validation rejects headers, incomplete domains and multiple addresses',()=>{
  for(const email of ['buyer@','buyer@example','a@b.com,c@d.com','a@b.com\r\nBcc: x@y.com']) assert.ok(rfq.parseContact({...sample,email},false).error,email);
});
test('a quote needs an explicit category and a meaningful requirement or file',()=>{
  assert.ok(rfq.parseContact({...sample,requestType:'quote'},false).error);
  assert.ok(rfq.parseContact({...sample,requestType:'quote',category:'Other',message:''},true).fields);
  assert.ok(rfq.parseContact({...sample,message:'Hi'},false).error);
  assert.ok(rfq.parseContact({...sample,category:'invented service'},false).error);
});
test('operations email preserves line breaks, escapes HTML, and identifies missing details',()=>{
  const fields=rfq.parseContact({...sample,requestType:'quote',category:'Other',company:'A&B <img src=x onerror=alert(1)>',message:'Line one\n<script>alert(1)</script>'},false).fields;
  const result=rfq.buildRfqEmail(fields,'RFQ-DEMO','2026-09-08T08:00:00Z',{name:'<scope>.pdf',size:2400});
  assert.ok(!result.html.includes('<script>'));assert.ok(!result.html.includes('<img src=x'));
  assert.ok(result.html.includes('&lt;scope&gt;.pdf'));assert.ok(result.text.includes('Line one\n<script>'));
  assert.match(result.text,/Clarify before quoting: vessel \/ project, delivery point, required date \/ ETA/);
  assert.match(result.html,/mailto:buyer@example.com/);assert.match(result.text,/10:00:00 CAT/);
});
function handler({storageFails=false,email=true,webhook=false}={}) {
  const captured={};
  const route=load('src/app/api/contact/route.ts',{
    '@/lib/rfq':rfq,
    '@/lib/site':{contact:{emails:{operations:'operations@example.com'},phone:{display:'+264 81 000 0000'}}},
    '@/lib/rate-limit':{getClientIp:()=> 'test',checkRateLimit:async()=>({allowed:true})},
    '@/lib/lead-store':{persistLead:async(kind,entry)=>{if(storageFails)throw Error('simulated outage'); captured.kind=kind;captured.entry=entry;return 'ENQ-TEST-123456';}},
    '@/lib/lead-notifications':{sendOperationsEmail:async args=>{captured.email=args;return email;},postSignedWebhook:async args=>{captured.webhook=args;return webhook;}}
  });
  return {post:route.POST,captured};
}
const request = data => new Request('http://localhost/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});
test('multipart catalogue and solution context survive storage and webhook notification failure',async()=>{
  const h=handler({email:false,webhook:false});const form=new FormData();
  for(const [key,value] of Object.entries({...sample,sourceContext:'planned-maintenance',multiLocation:'Walvis Bay and Cape Town'}))form.set(key,value);
  form.set('catalogueSelections',JSON.stringify([{file:catalogueFile,detail:'Page 12, part ABC',quantity:'12 units'}]));
  const response=await h.post(new Request('http://localhost/api/contact',{method:'POST',body:form}));
  assert.equal(response.status,503);assert.equal((await response.json()).stored,true);
  assert.equal(h.captured.entry.catalogueSelections[0].quantity,'12 units');
  assert.equal(JSON.parse(h.captured.webhook.payload).request.sourceContext,'planned-maintenance');
  assert.match(h.captured.email.text,/Page 12, part ABC/);
});
test('invalid catalogue payloads fail before storage or notification',async()=>{
  const h=handler();const response=await h.post(request({...sample,catalogueSelections:[{file:'https://invalid.example',detail:'Part ABC',quantity:'1'}]}));
  assert.equal(response.status,400);assert.equal(h.captured.entry,undefined);assert.equal(h.captured.email,undefined);
});
test('malformed JSON payloads and honeypots are rejected without notification',async()=>{
  const h=handler();for(const body of [null,[],42,{...sample,website:'spam'}]) assert.equal((await h.post(request(body))).status,400);
  assert.equal(h.captured.email,undefined);
});
test('successful request keeps customer reply-to, styled email and correct enquiry type',async()=>{
  const h=handler();const response=await h.post(request(sample));assert.equal(response.status,200);
  assert.equal(h.captured.email.replyTo,sample.email);assert.match(h.captured.email.html,/Example Marine/);
  assert.equal(h.captured.kind,'enquiry');assert.equal((await response.json()).notified,true);
});
test('storage failure never returns success or sends an unrecorded enquiry',async()=>{
  const h=handler({storageFails:true});assert.equal((await h.post(request(sample))).status,503);assert.equal(h.captured.email,undefined);
});
test('notification failure returns saved reference and stored state, not success',async()=>{
  const h=handler({email:false,webhook:false});const response=await h.post(request(sample));const result=await response.json();
  assert.equal(response.status,503);assert.equal(result.stored,true);assert.equal(result.reference,'ENQ-TEST-123456');assert.equal(result.ok,undefined);
});
test('a 3.5 MB attachment survives durable storage, email and webhook, including partial delivery failure',async()=>{
  const h=handler({email:false,webhook:false});const form=new FormData();for(const [k,v]of Object.entries({...sample,requestType:'quote',category:'Other',message:''}))form.set(k,v);
  const bytes=Buffer.alloc(3.5*1024*1024,32);bytes.write('%PDF-1.7\n');form.set('rfqFile',new File([bytes],'scope.pdf',{type:'application/pdf'}));
  const response=await h.post(new Request('http://localhost/api/contact',{method:'POST',body:form}));assert.equal(response.status,503);
  assert.equal(Buffer.from(h.captured.entry.attachment.base64,'base64').length,bytes.length);
  assert.equal(h.captured.email.attachment.base64,h.captured.entry.attachment.base64);
  assert.equal(JSON.parse(h.captured.webhook.payload).attachment.base64,h.captured.entry.attachment.base64);
});
test('wrong file signatures are rejected before persistence',async()=>{
  const h=handler();const form=new FormData();for(const [k,v] of Object.entries(sample))form.set(k,v);form.set('rfqFile',new File(['not a PDF'],'scope.pdf'));
  assert.equal((await h.post(new Request('http://localhost/api/contact',{method:'POST',body:form}))).status,400);assert.equal(h.captured.entry,undefined);
});
test('production sender cannot silently fall back to resend.dev',async()=>{
  const names=['NODE_ENV','RESEND_API_KEY','RFQ_FROM_EMAIL','RESEND_EMAIL_DOMAIN'];const saved=Object.fromEntries(names.map(k=>[k,process.env[k]]));
  try {
    process.env.NODE_ENV='production';process.env.RESEND_API_KEY='test-only';delete process.env.RFQ_FROM_EMAIL;delete process.env.RESEND_EMAIL_DOMAIN;
    let sends=0;
    const notifications=load('src/lib/lead-notifications.ts',{'resend':{Resend:class{emails={send:async()=>{sends++;return{error:null};}}}},'@/lib/site':{contact:{emails:{operations:'operations@example.com'}}}});
    assert.equal(await notifications.sendOperationsEmail({subject:'Test',text:'Test',replyTo:'buyer@example.com'}),false);assert.equal(sends,0);
    process.env.RFQ_FROM_EMAIL='Daron Website <website@example.com>';
    assert.equal(await notifications.sendOperationsEmail({subject:'Test',text:'Test',replyTo:'buyer@example.com'}),true);assert.equal(sends,1);
  } finally {for(const k of names){if(saved[k]===undefined)delete process.env[k];else process.env[k]=saved[k];}}
});
test('English, French and Portuguese have complete intake, home and growth dictionaries',()=>{
  const all=['en','fr','pt'].map(locale=>JSON.parse(fs.readFileSync(`messages/${locale}.json`,'utf8')));
  for(const namespace of ['Intake','PremiumHome','Growth'])for(const messages of all)assert.deepEqual(Object.keys(messages[namespace]).sort(),Object.keys(all[0][namespace]).sort());
  for(const messages of all)assert.deepEqual(Object.keys(messages.Growth.sources).sort(),Object.keys(enquiryContext.enquirySources).sort());
});
