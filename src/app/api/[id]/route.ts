import { mappings } from "../submit/data";

export async function GET(
  _request: Request,
  { params: { id } }: { params: { id: string } }
) {
  return Response.json({
    name: mappings.find((m) => m.id === id)?.name || null,
  });
}
