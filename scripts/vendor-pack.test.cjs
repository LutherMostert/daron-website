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
const pack = load('src/lib/vendor-pack.ts', { '@/lib/rfq': rfq });
const content = load('src/lib/vendor-pack-content.ts');

const NOW = new Date('2026-11-23T10:00:00Z');
const valid = { email: 'Buyer@Example-Shipping.com', company: 'Example Shipping', role: 'Purchasing or procurement', platform: 'ShipServ', vessel: 'MV Example', eta: '2026-12-14', locale: 'fr' };

function routeWith({ stored = 'PACK-20261123-ABC123', notified = true, limit = { allowed: true } } = {}) {
  const calls = { stored: [], emails: [] };
  const route = load('src/app/api/vendor-pack/route.ts', {
    '@/lib/site': siteData,
    '@/lib/vendor-pack': pack,
    '@/lib/rate-limit': { getClientIp: () => '203.0.113.9', checkRateLimit: async () => limit },
    '@/lib/lead-store': { persistLead: async (kind, entry) => { calls.stored.push({ kind, entry }); if (stored instanceof Error) throw stored; return stored; } },
    '@/lib/lead-notifications': { sendOperationsEmail: async args => { calls.emails.push(args); return notified; } },
  });
  const post = body => route.POST(new Request('http://localhost/api/vendor-pack', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) }));
  return { post, calls };
}

test('vendor pack request: normalises a valid request and keeps its call details', () => {
  const { fields, error } = pack.parseVendorPackRequest(valid, NOW);
  assert.equal(error, undefined);
  assert.equal(fields.email, 'buyer@example-shipping.com');
  assert.equal(fields.vessel, 'MV Example');
  assert.equal(fields.eta, '2026-12-14');
  assert.equal(fields.locale, 'fr');
  assert.equal(pack.parseVendorPackRequest({ ...valid, locale: 'de', platform: '', vessel: '', eta: '' }, NOW).fields.locale, 'en');
});

test('vendor pack request: rejects bad email, company, role, platform and ETA with a field code', () => {
  const cases = [
    [{ email: 'not-an-email' }, 'email'],
    [{ company: ' ' }, 'company'],
    [{ role: 'CEO' }, 'role'],
    [{ platform: 'Invented portal' }, 'platform'],
    [{ eta: '2026-02-30' }, 'eta'],
    [{ eta: '2026-11-01' }, 'eta'],
    [{ eta: '2028-06-01' }, 'eta'],
    [{ eta: '14/12/2026' }, 'eta'],
  ];
  for (const [change, code] of cases) assert.equal(pack.parseVendorPackRequest({ ...valid, ...change }, NOW).code, code, JSON.stringify(change));
  assert.ok(pack.parseVendorPackRequest({ ...valid, eta: '2026-11-22' }, NOW).fields, 'yesterday is allowed for time-zone slack');
});

test('vendor pack request: strips line breaks so a visitor cannot forge email headers or log lines', () => {
  const { fields } = pack.parseVendorPackRequest({ ...valid, company: 'Evil Co\r\nBcc: someone@example.com' }, NOW);
  assert.equal(fields.company.includes('\n'), false);
  const { subject, html } = pack.buildVendorPackEmail({ ...fields, company: '<b>Evil</b> Co' }, 'PACK-TEST', '2026-11-23T10:00:00.000Z');
  assert.equal(/[\r\n]/.test(subject), false);
  assert.ok(html.includes('&lt;b&gt;Evil&lt;/b&gt; Co'));
  assert.equal(html.includes('<b>Evil</b>'), false);
});

test('vendor pack email: names the coming call in the subject and gives the next step', () => {
  const { fields } = pack.parseVendorPackRequest(valid, NOW);
  const withCall = pack.buildVendorPackEmail(fields, 'PACK-TEST', '2026-11-23T10:00:00.000Z');
  assert.equal(withCall.subject, 'Vendor pack downloaded: Example Shipping (Walvis Bay call: MV Example, ETA 2026-12-14)');
  assert.ok(withCall.text.includes('Next step: They gave a coming call.'));
  const noCall = pack.buildVendorPackEmail({ ...fields, vessel: '', eta: '', platform: '' }, 'PACK-TEST', '2026-11-23T10:00:00.000Z');
  assert.equal(noCall.subject, 'Vendor pack downloaded: Example Shipping');
  assert.ok(noCall.text.includes('Registers suppliers on: Not given'));
});

test('vendor pack route: stores the lead, alerts operations with reply-to and returns the download', async () => {
  const { post, calls } = routeWith();
  const response = await post({ ...valid, eta: '' });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.reference, 'PACK-20261123-ABC123');
  assert.equal(body.downloadUrl, pack.PACK_DOWNLOAD_PATH);
  assert.equal(calls.stored[0].kind, 'resource');
  assert.equal(calls.stored[0].entry.source, 'daron-website:vendor-pack');
  assert.equal(calls.emails[0].replyTo, 'buyer@example-shipping.com');
  assert.ok(calls.emails[0].text.includes('PACK-20261123-ABC123'));
});

test('vendor pack route: still serves the pack when only one of storage or email works, and refuses when both fail', async () => {
  const storageDown = routeWith({ stored: new Error('redis down') });
  const one = await storageDown.post({ ...valid, eta: '' });
  assert.equal(one.status, 200);
  assert.deepEqual((({ stored, notified, reference }) => ({ stored, notified, reference }))(await one.json()), { stored: false, notified: true, reference: null });

  const mailDown = routeWith({ notified: false });
  const two = await mailDown.post({ ...valid, eta: '' });
  assert.equal(two.status, 200);
  assert.equal((await two.json()).stored, true);

  const bothDown = routeWith({ stored: new Error('redis down'), notified: false });
  const three = await bothDown.post({ ...valid, eta: '' });
  assert.equal(three.status, 503);
  const body = await three.json();
  assert.equal(body.code, 'unavailable');
  assert.equal(body.downloadUrl, undefined);
});

test('vendor pack route: rejects honeypot, bad JSON, invalid fields and rate-limited callers without storing or emailing', async () => {
  const { post, calls } = routeWith();
  assert.equal((await post({ ...valid, website: 'bot' })).status, 400);
  assert.equal((await post('{not json')).status, 400);
  const invalid = await post({ ...valid, role: 'CEO' });
  assert.equal(invalid.status, 400);
  assert.equal((await invalid.json()).code, 'role');
  assert.equal(calls.stored.length, 0);
  assert.equal(calls.emails.length, 0);

  const limited = routeWith({ limit: { allowed: false, retryAfterSeconds: 120 } });
  const response = await limited.post(valid);
  assert.equal(response.status, 429);
  assert.equal((await response.json()).code, 'rate');
  assert.equal(limited.calls.stored.length, 0);
});

test('vendor pack copy: every language has a label for each role and platform', () => {
  for (const locale of ['en', 'fr', 'pt']) {
    const copy = content.getVendorPackContent(locale);
    assert.equal(copy.roles.length, pack.PACK_ROLES.length, locale);
    assert.equal(copy.platforms.length, pack.PACK_PLATFORMS.length, locale);
    assert.equal(copy.includes.length, 6, locale);
  }
});

test('vendor pack download: the published Word file exists where the route points', () => {
  const file = 'public' + pack.PACK_DOWNLOAD_PATH.split('?')[0];
  const bytes = fs.readFileSync(file);
  assert.ok(bytes.length > 10000);
  assert.deepEqual([...bytes.subarray(0, 4)], [0x50, 0x4b, 0x03, 0x04]);
});
