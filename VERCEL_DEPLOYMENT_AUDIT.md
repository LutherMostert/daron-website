# Vercel deployment risk audit

Audit date: 8 September 2026. Recommendation: resolve the priority findings before production release.

## Scope and verification limits

Audited the current working tree of `LutherMostert/daron-website`, in `C:/Users/luthe/OneDrive/Documents/AI/daron-premium-preview`, branch `codex/premium-rfq-20260908`, HEAD `fc4e9ec`, including existing uncommitted changes and new files. The parent AI folder is not a repository. This review does not establish which commit is deployed.

The Vercel plugin returned `UNAUTHORIZED`, requiring reauthentication. No local `.vercel/project.json` was present. Hosted project identity, root directory, Node version, environment variables, deployment protection, function settings, logs and production health are **Not yet verified**. Public official documentation was used after the connector failed.

No application code was changed, deployment created, email sent, or live lead stored. The audit produced this report and local build output. Existing work was preserved.

## Findings, in priority order

### 1. [P1] Upgrade the Next.js dependency before release

Evidence: `package.json:21` pins Next.js to 16.2.4; the lockfile and local build confirm that version. `next.config.ts` enables the default image optimizer, AVIF output, and remote images from `www.daron.com.na/wp-content/uploads/**`.

The official August 25 advisory GHSA-2xp9-vwfh-vxw4 includes Next.js versions below 16.3.3 and describes critical remote code execution when an attacker-controlled AVIF input reaches vulnerable image optimization. The published 16.x patch is 16.3.3. Upgrade Next.js and its matching lint configuration to a supported patched release, regenerate the lockfile, and rerun build and image checks.

This is a confirmed affected dependency version, not a demonstrated exploit. AVIF output configuration alone does not establish that an attacker can supply AVIF input. The remote allowlist restricts the input surface; the actual Vercel managed optimizer and its mitigation state could not be inspected. The separate Windows mixed-router advisory is not counted as a Vercel finding for this App Router repository.

Sources: [Next.js August security release](https://nextjs.org/blog/august-2026-security-release), [version ranges and advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4).

### 2. [P1] Rate limiting allows paid chat requests when Redis fails

Evidence: `src/lib/rate-limit.ts:38-52`. The code accepts every SDK result with `success: true`. Installed `@upstash/ratelimit` defaults to a five-second timeout and returns `success: true, reason: "timeout"` on that path. Missing Redis or thrown errors instead use a module-local Map. Each serverless instance can have its own Map, so that fallback does not enforce a shared limit.

Offline reproduction with the real application module and a simulated SDK timeout returned `{"allowed":true,"remaining":0}`. With Redis absent, two independent module instances each allowed the same key despite a limit of one. `/api/chat` can still invoke configured paid model providers without durable Redis.

Fix: explicitly reject or return service-unavailable on limiter timeout/error in deployed environments, retain memory-only behavior for local development, and require shared rate-limit configuration before enabling paid chat. Verify the SDK timeout result as well as thrown exceptions.

### 3. [P2] Chat leads report success when both notification channels fail

Evidence: `src/app/api/chat-lead/route.ts:149-158` discards the boolean results of both notification calls and returns HTTP 201 with `ok: true`. Unlike `/api/contact`, it never signals that operations was not notified. Notification status is not persisted and no retry worker is present in this repository.

Offline reproduction: durable-storage mock succeeded; both notification mocks returned false; the handler still returned `201 {"ok":true,"reference":"CHAT-AUDIT"}`. This can leave an enquiry stored in Redis but unseen by operations during a sender configuration error or upstream outage.

Fix: distinguish stored and notified states, persist delivery status, and provide a retry/reconciliation path. Preserve the saved reference so the visitor is not encouraged to submit duplicates. Any external reconciliation process remains unverified.

### 4. [P2] The Anthropic fallback has no deadline within the function budget

Evidence: `src/app/api/chat/route.ts:91-98` constructs Anthropic without timeout or retry overrides. The installed SDK uses a 600,000 ms timeout for this non-streaming request and two retries. Gateway and OpenAI calls each allow 25 seconds and run sequentially before Anthropic in the default order. No route-level `maxDuration` is declared.

A slow Anthropic request can outlast Vercel's documented default Fluid Compute duration of 300 seconds, yielding a platform timeout before the handler can return its fallback message. Actual hosted duration and Fluid Compute status are unverified; older/non-default configurations may allow less time.

Fix: enforce a total request deadline, bound each provider's timeout and retries to the remaining budget, and configure a compatible function duration. Merely increasing the function duration does not provide prompt fallback.

Source: [Vercel function duration and payload limits](https://vercel.com/docs/functions/limitations). SDK defaults were inspected locally without a provider request.

### 5. [P2] Build/runtime versions are not declared for deployment

Evidence: `package.json` has neither `engines.node` nor `packageManager`. Installed `ai@7.0.28` and its locked provider packages require Node >=22. The local node command reports 22.17.0 and pnpm reports 11.19.0. The lockfile format is 9.0, which does not uniquely specify the tested pnpm version for Vercel.

If the existing Vercel project retains Node 20, the AI SDK's engine requirement is not satisfied. This is a conditional deployment risk, not a confirmed hosted mismatch. Local success using already-installed dependencies does not validate a clean Linux install or the hosted package-manager selection.

Fix: declare a supported tested Node major (at least 22) and an exact package-manager version, align Vercel settings/Corepack, then verify a clean frozen-lockfile install and build in the matching Linux environment.

Sources: [Vercel Node version selection](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vercel package-manager selection](https://vercel.com/docs/package-managers).

## Hosted release checks still needed

These are unverified configuration dependencies, not claims that production is misconfigured.

| Area | Required verification |
| --- | --- |
| Project mapping | Confirm the Vercel project is linked to `LutherMostert/daron-website`, intended branch and repository root. The local parent AI folder must not be used as the source directory. |
| Lead storage | Supply a matching `KV_REST_API_URL` / `KV_REST_API_TOKEN` pair or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` pair in the intended environment. Without Redis, contact and chat-lead persistence returns 503 even though the build succeeds. |
| Operations notification | Verify `RESEND_API_KEY`, a verified `RFQ_FROM_EMAIL` or `RESEND_EMAIL_DOMAIN`, and the intended `RFQ_TO_EMAIL`; alternatively verify the configured webhook. Production rejects the `resend.dev` fallback. Webhook signing requires `CHAT_LEAD_WEBHOOK_SECRET` and receiver-side verification. |
| Preview isolation | Verify preview protection and separate preview storage/notification destinations. Supplying live mail credentials to preview enables real operations notifications; there is no separate preview-send gate. |
| AI | Confirm the configured provider/model is usable, gateway access/billing is enabled where needed, shared limits work, and spend controls are appropriate. `VERCEL` alone makes the chat status endpoint report a configured gateway; that is not an upstream health check. |
| Attachment path | Verify a maximum-size accepted upload against actual Redis and webhook services. The 4 MiB file becomes 5,592,408 base64 bytes before JSON overhead. Current Upstash docs state 10 MB per request for Free/PAYG, so this is not automatically a Redis limit violation. The incoming multipart request is below Vercel's 4.5 MB limit within the application's declared allowance; the later outbound base64 payload should not be confused with that ingress limit. |
| Delivery recovery | Confirm operational ownership of stored-but-unnotified leads; records expire after 180 days. Contact reports notification failure but this repository provides no automated outbox retry worker. |
| Logs | `src/app/api/chat-lead/route.ts:124` logs contact details, message text, referrer and IP. Prefer reference/status-only logs and confirm access, retention and drains. |
| Release validation | Verify a clean Linux build, hosted preview routes, three locales, image optimization and approved internal email/attachment delivery before promotion. Ensure the intended uncommitted/new files are included in the reviewed release. |

Attachment sources: [Upstash request-size documentation](https://upstash.com/docs/redis/troubleshooting/max_request_size_exceeded), [Vercel limits](https://vercel.com/docs/functions/limitations). Environment source: [Vercel environment variables](https://vercel.com/docs/environment-variables).

## Checks completed

- `pnpm test`: 18/18 existing tests passed, using isolated storage/mail mocks.
- `pnpm lint`: passed.
- `pnpm build`: passed, including TypeScript and 101 generated pages. Build warning: `middleware.ts` convention is deprecated in favor of `proxy.ts`; this did not block the build.
- Offline failure reproductions confirmed limiter timeout allowance, independent in-memory quotas and successful chat-lead responses when both notifications fail.
- Inspected installed AI engine constraints, Anthropic timeout/retry defaults and rate-limiter timeout implementation.
- No tracked `.env*`, `.pem` or `.vercel/*` files found in the current index. This was not a full Git-history secret scan.

No clean dependency install, Linux build, hosted build-log review, live delivery test, exploit test or production smoke test was performed. Passing local checks does not close the findings or the hosted verification gaps.
