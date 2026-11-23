/* eslint-disable @typescript-eslint/no-require-imports -- Isolated CommonJS test harness for server modules. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Runs the real TypeScript modules with mocked storage and mail. Never sends mail or writes live storage.
function load(path, mocks = {}) {
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const loaded = { exports: {} };
  new Function('require', 'module', 'exports', code)(name => name in mocks ? mocks[name] : require(name), loaded, loaded.exports);
  return loaded.exports;
}
const siteData = load('src/lib/site.ts');
const enquiryContext = load('src/lib/enquiry-context.ts', { './site': siteData });
const rfq = load('src/lib/rfq.ts', { './enquiry-context': enquiryContext });
const requests = load('src/lib/resource-requests.ts', { '@/lib/rfq': rfq });
const formLabels = load('src/lib/resource-form-content.ts');
const vendorContent = load('src/lib/vendor-pack-content.ts');
const portCallContent = load('src/lib/port-call-content.ts');

const NOW = new Date('2026-11-23T10:00:00Z');
const valid = { email: 'Buyer@Example-Shipping.com', company: 'Example Shipping', role: 'Purchasing or procurement', platform: 'ShipServ', vessel: 'MV Example', eta: '2026-12-14', locale: 'fr' };

function routeWith({ stored = 'PACK-20261123-ABC123', notified = true, limit = { allowed: true } } = {}) {
  const calls = { stored: [], emails: [] };
  const route = load('src/app/api/resource-request/route.ts', {
    '@/lib/site': siteData,
    '@/lib/resource-requests': requests,
    '@/lib/rate-limit': { getClientIp: () => '203.0.113.9', checkRateLimit: async () => limit },
    '@/lib/lead-store': { persistLead: async (kind, entry) => { calls.stored.push({ kind, entry }); if (stored instanceof Error) throw stored; return stored; } },
    '@/lib/lead-notifications': { sendOperationsEmail: async args => { calls.emails.push(args); return notified; } },
  });
  const post = body => route.POST(new Request('http://localhost/api/resource-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) }));
  return { post, calls };
}

test('resource request: normalises a valid request, keeps call details and defaults to the vendor pack', () => {
  const { fields, error } = requests.parseResourceRequest(valid, NOW);
  assert.equal(error, undefined);
  assert.equal(fields.asset, 'vendor-pack');
  assert.equal(fields.email, 'buyer@example-shipping.com');
  assert.equal(fields.eta, '2026-12-14');
  assert.equal(fields.locale, 'fr');
  assert.equal(requests.parseResourceRequest({ ...valid, asset: 'port-call-pack' }, NOW).fields.asset, 'port-call-pack');
  assert.equal(requests.parseResourceRequest({ ...valid, locale: 'de', platform: '', vessel: '', eta: '' }, NOW).fields.locale, 'en');
});

test('resource request: rejects unknown assets and bad email, company, role, platform and ETA with a field code', () => {
  const cases = [
    [{ asset: 'secret-file' }, 'asset'],
    [{ asset: 'constructor' }, 'asset'],
    [{ email: 'not-an-email' }, 'email'],
    [{ company: ' ' }, 'company'],
    [{ role: 'CEO' }, 'role'],
    [{ platform: 'Invented portal' }, 'platform'],
    [{ eta: '2026-02-30' }, 'eta'],
    [{ eta: '2026-11-01' }, 'eta'],
    [{ eta: '2028-06-01' }, 'eta'],
    [{ eta: '14/12/2026' }, 'eta'],
  ];
  for (const [change, code] of cases) assert.equal(requests.parseResourceRequest({ ...valid, ...change }, NOW).code, code, JSON.stringify(change));
  assert.ok(requests.parseResourceRequest({ ...valid, eta: '2026-11-22' }, NOW).fields, 'yesterday is allowed for time-zone slack');
});

test('resource email: strips line breaks, escapes HTML and names the download and the coming call', () => {
  const { fields } = requests.parseResourceRequest({ ...valid, asset: 'port-call-pack', company: 'Evil Co\r\nBcc: someone@example.com' }, NOW);
  assert.equal(fields.company.includes('\n'), false);
  const { subject, html, text } = requests.buildResourceEmail({ ...fields, company: '<b>Evil</b> Co' }, 'PACK-TEST', '2026-11-23T10:00:00.000Z');
  assert.equal(/[\r\n]/.test(subject), false);
  assert.ok(subject.startsWith('Port Call Pack downloaded: <b>Evil</b> Co (Walvis Bay call: MV Example, ETA 2026-12-14)'));
  assert.ok(html.includes('&lt;b&gt;Evil&lt;/b&gt; Co'));
  assert.equal(html.includes('<b>Evil</b>'), false);
  assert.ok(text.includes('ask for the RFQ in the template'));
  const vendor = requests.buildResourceEmail({ ...fields, asset: 'vendor-pack', vessel: '', eta: '', platform: '' }, 'PACK-TEST', '2026-11-23T10:00:00.000Z');
  assert.equal(vendor.subject, 'Vendor Registration Pack downloaded: Evil Co Bcc: someone@example.com');
  assert.ok(vendor.text.includes('offer certificates'));
});

test('resource route: stores the lead, alerts operations with reply-to and returns every file of the asset', async () => {
  const { post, calls } = routeWith();
  const response = await post({ ...valid, asset: 'port-call-pack', eta: '' });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.asset, 'port-call-pack');
  assert.deepEqual(body.downloads.map(file => file.key), ['checklist', 'rfq']);
  assert.equal(body.downloadUrl, body.downloads[0].url);
  assert.equal(calls.stored[0].kind, 'resource');
  assert.equal(calls.stored[0].entry.source, 'daron-website:port-call-pack');
  assert.equal(calls.emails[0].replyTo, 'buyer@example-shipping.com');
  assert.ok(calls.emails[0].subject.startsWith('Port Call Pack downloaded'));
});

test('resource route: old vendor-pack requests without an asset still get the vendor pack', async () => {
  const { post } = routeWith();
  const body = await (await post({ ...valid, eta: '' })).json();
  assert.equal(body.asset, 'vendor-pack');
  assert.deepEqual(body.downloads.map(file => file.key), ['pack']);
  const alias = load('src/app/api/vendor-pack/route.ts', { '../resource-request/route': { POST: 'shared-handler' } });
  assert.equal(alias.POST, 'shared-handler');
});

test('resource route: serves the files when only storage or email works, and refuses when both fail', async () => {
  const storageDown = await routeWith({ stored: new Error('redis down') }).post({ ...valid, eta: '' });
  assert.equal(storageDown.status, 200);
  assert.deepEqual((({ stored, notified, reference }) => ({ stored, notified, reference }))(await storageDown.json()), { stored: false, notified: true, reference: null });
  const mailDown = await routeWith({ notified: false }).post({ ...valid, eta: '' });
  assert.equal(mailDown.status, 200);
  assert.equal((await mailDown.json()).stored, true);
  const bothDown = await routeWith({ stored: new Error('redis down'), notified: false }).post({ ...valid, eta: '' });
  assert.equal(bothDown.status, 503);
  const body = await bothDown.json();
  assert.equal(body.code, 'unavailable');
  assert.equal(body.downloads, undefined);
});

test('resource route: rejects honeypot, bad JSON, invalid fields and rate-limited callers without storing or emailing', async () => {
  const { post, calls } = routeWith();
  assert.equal((await post({ ...valid, website: 'bot' })).status, 400);
  assert.equal((await post('{not json')).status, 400);
  const invalid = await post({ ...valid, asset: 'secret-file' });
  assert.equal(invalid.status, 400);
  assert.equal((await invalid.json()).code, 'asset');
  assert.equal(calls.stored.length, 0);
  assert.equal(calls.emails.length, 0);
  const limited = routeWith({ limit: { allowed: false, retryAfterSeconds: 120 } });
  const response = await limited.post(valid);
  assert.equal(response.status, 429);
  assert.equal((await response.json()).code, 'rate');
  assert.equal(limited.calls.stored.length, 0);
});

test('resource copy: every language labels each role, platform and download file', () => {
  for (const locale of ['en', 'fr', 'pt']) {
    const labels = formLabels.getResourceFormLabels(locale);
    assert.equal(labels.roles.length, requests.REQUEST_ROLES.length, locale);
    assert.equal(labels.platforms.length, requests.REQUEST_PLATFORMS.length, locale);
    const vendor = vendorContent.getVendorPackContent(locale);
    const portCall = portCallContent.getPortCallContent(locale);
    for (const [asset, copy] of [['vendor-pack', vendor.form], ['port-call-pack', portCall.form]]) {
      for (const file of requests.RESOURCE_ASSETS[asset].files) assert.ok(copy.downloads[file.key], `${locale} ${asset} ${file.key}`);
    }
    assert.equal(portCall.sections.length, 4, locale);
    assert.equal(portCall.sections.reduce((total, section) => total + section.items.length, 0), 13, locale);
    assert.ok(portCall.metaDescription.length >= 120 && portCall.metaDescription.length <= 165, `${locale} meta description length ${portCall.metaDescription.length}`);
  }
});

test('resource downloads: every published file exists where the route points and is a real Office file', () => {
  for (const asset of Object.keys(requests.RESOURCE_ASSETS)) {
    for (const file of requests.RESOURCE_ASSETS[asset].files) {
      const bytes = fs.readFileSync('public' + file.url.split('?')[0]);
      assert.ok(bytes.length > 10000, file.url);
      assert.deepEqual([...bytes.subarray(0, 4)], [0x50, 0x4b, 0x03, 0x04], file.url);
    }
  }
});
