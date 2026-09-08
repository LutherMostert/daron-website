import fs from 'node:fs';
import assert from 'node:assert/strict';
const results=[];
for(const locale of ['en','fr','pt']) for(const route of ['', '/contact','/services/coatings','/group-network','/solutions','/solutions/vessel-reactivation','/solutions/planned-maintenance','/solutions/remote-site-supply','/procurement-resources']){
 const name=locale+route;const html=fs.readFileSync(`.next/server/app/${name}.html`,'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,name);
 assert.ok(html.includes('rel="canonical"'),name+' canonical');
 assert.ok(html.includes('name="description"'),name+' description');
 assert.ok(html.includes(`lang="${locale}"`),name+' language');
 assert.ok(!html.includes('maximum-scale'),name+' zoom');
 assert.ok(html.includes('property="og:title"'),name+' social');
 results.push({route:name,metadata:'PASS'});
}
const services=fs.readFileSync('.next/server/app/en/services.html','utf8');
for(const anchor of ['catering','warehousing'])assert.ok(services.includes(`id="${anchor}"`));
const home=fs.readFileSync('.next/server/app/en.html','utf8');
for(const match of home.matchAll(/href="(\/[^"?#]*)[^" ]*"/g)){
 const path=match[1];if(path.startsWith('/_next')||path==='/')continue;
 if(path==='/favicon.ico'){assert.ok(fs.existsSync('src/app/favicon.ico'));continue;}
 if(path.startsWith('/images')||path.startsWith('/catalogues')){assert.ok(fs.existsSync(`public${path}`),path);continue;}
 if(path==='/icon'||path==='/apple-icon'||path==='/manifest.webmanifest')continue;
 const localized=/^\/(en|fr|pt)(\/|$)/.test(path)?path:`/en${path}`;
 assert.ok(fs.existsSync(`.next/server/app${localized}.html`),path);
}
fs.mkdirSync('.preview',{recursive:true});fs.writeFileSync('.preview/verification.json',JSON.stringify({generatedAt:new Date().toISOString(),pages:results,homeLinks:'PASS',serviceAnchors:'PASS'},null,2));
console.log(JSON.stringify({pages:results.length,metadata:'PASS',homeLinks:'PASS',serviceAnchors:'PASS'}));
