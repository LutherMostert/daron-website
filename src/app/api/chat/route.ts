/** Preview branch: no model calls, lead persistence, email or webhook delivery. */
export async function POST() {
  return Response.json({ error: "Live chat is disabled in this design preview." }, { status: 503 });
}
