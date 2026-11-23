/**
 * POST /api/vendor-pack — kept for pages loaded before the shared resource route existed.
 * Requests without an asset are treated as the Vendor Registration Pack.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export { POST } from "../resource-request/route";
