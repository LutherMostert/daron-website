import fs from 'node:fs';
import ts from 'typescript';
import http from 'node:http';
function load(path,dependencies={}) {
 const code=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const loaded={exports:{}};new Function('require','exports',code)(name=>{if(!(name in dependencies))throw Error('Unexpected dependency '+name);return dependencies[name];},loaded.exports);return loaded.exports;
}
const site=load('src/lib/site.ts');
const context=load('src/lib/enquiry-context.ts',{'./site':site});
const {buildRfqEmail,parseContact}=load('src/lib/rfq.ts',{'./enquiry-context':context});
const sample={requestType:'enquiry',firstName:'Example Buyer',company:'Example Marine',email:'buyer@example.com',preferredContact:'Email',message:'I would like more information about your vessel supply services.\nPlease contact me by email.'};
const examples={
 'email':{...sample},
 'rfq':{...sample,requestType:'quote',category:'Coatings / surface preparation',sourceContext:'planned-maintenance',message:'Please review the selected catalogue references for our maintenance scope.',multiLocation:'Walvis Bay: planned maintenance window.\nCape Town: optional follow-on supply; arrangements to be confirmed.',catalogueSelections:[{file:context.catalogueDirectory.find(item=>item.brand==='Hempel').file,detail:'Please advise on a suitable system for the supplied specification.',quantity:'Surface area to be confirmed'}]},
};
const pages={};fs.mkdirSync('.preview',{recursive:true});
for(const [key,value] of Object.entries(examples)) {
 const parsed=parseContact(value,false);if(!parsed.fields)throw Error(parsed.error);
 const email=buildRfqEmail(parsed.fields,key==='rfq'?'RFQ-PREVIEW-000002':'ENQ-PREVIEW-000001','2026-09-08T06:00:00Z');
 const html=email.html.replace('<table role="presentation" width="100%"','<p style="text-align:center;font:12px Arial;color:#526174;padding:10px">DESIGN PREVIEW · SAMPLE DATA · NOT SENT</p><table role="presentation" width="100%"');
 pages[`/${key}.html`]=html;fs.writeFileSync(`.preview/${key}.html`,html);fs.writeFileSync(`.preview/${key}.txt`,`${email.subject}\n\n${email.text}`);
}
pages['/']=pages['/email.html'];
if(process.argv.includes('--serve')) http.createServer((request,response)=>{const page=pages[request.url];if(!page){response.writeHead(404);response.end();return;}response.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});response.end(page);}).listen(3101,'localhost',()=>console.log('Email previews: http://localhost:3101 and http://localhost:3101/rfq.html'));
