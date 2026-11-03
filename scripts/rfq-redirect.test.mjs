import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Read-only HTTP checks against a running build; never submits an enquiry.
// pnpm build && pnpm start --hostname 127.0.0.1 --port 3100
// RFQ_TEST_URL=http://127.0.0.1:3100 node --test scripts/rfq-redirect.test.mjs
const origin = process.env.RFQ_TEST_URL || "http://127.0.0.1:3100";
const query = "?from=group-network&source=hempel&item=paint&item=rope&detail=A%26B&email=synthetic%40example.invalid&price=987654.32&next=https%3A%2F%2Fexample.invalid";
const cases = [
  ["/rfq", "en", "/contact"],
  ["/en/rfq", "en", "/contact"],
  ["/fr/rfq", "fr", "/fr/contact"],
  ["/pt/rfq", "pt", "/pt/contact"],
  ["/rfq", "fr", "/fr/contact"],
  ["/rfq", "pt", "/pt/contact"],
  ["/en/rfq", "en", "/contact", "fr"],
];

for (const [path, locale, destination, language = locale] of cases) {
  test(`${path} (${locale}, preferred ${language}) reaches the existing quotation enquiry`, async () => {
    let url = new URL(path + query, origin);
    const expectedQuery = [...url.searchParams];
    let response;
    const cookies = new Map();
    for (let hop = 0; hop < 5; hop++) {
      response = await fetch(url, {
        redirect: "manual",
        headers: {
          "Accept-Language": language,
          Cookie: [...cookies].map(([key, value]) => `${key}=${value}`).join("; "),
        },
        signal: AbortSignal.timeout(15000),
      });
      if (response.status === 200) break;
      assert.ok([307, 308].includes(response.status), `Unexpected status ${response.status}`);
      const location = response.headers.get("location");
      assert.ok(location);
      const target = new URL(location, url);
      for (const cookie of response.headers.getSetCookie()) {
        const [key, ...value] = cookie.split(";", 1)[0].split("=");
        cookies.set(key, value.join("="));
      }
      assert.equal(target.origin, new URL(origin).origin);
      // Browsers inherit the previous fragment when Location has no fragment.
      if (!location.includes("#")) target.hash = url.hash;
      assert.deepEqual([...target.searchParams], expectedQuery);
      url = target;
      await response.body?.cancel();
    }
    assert.equal(response.status, 200, "Redirect must terminate successfully");
    assert.equal(url.pathname, destination);
    assert.equal(url.hash, "#rfq");
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`));
    assert.match(html, /id="rfq"/);
    assert.match(html, /data-quote-email/);
    const messages = JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url)));
    assert.ok(html.includes(messages.QuoteEmail.button));
    assert.ok(html.includes(encodeURIComponent(messages.QuoteEmail.subject)));
    assert.match(html, /mailto:dnoperations@daron-group\.com\?subject=/);
    // The routing change must not echo arbitrary enquiry context into the page.
    assert.ok(!html.includes("example.invalid"));
    assert.ok(!html.includes("987654.32"));
  });
}
