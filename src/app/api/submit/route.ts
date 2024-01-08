import { google } from "googleapis";
import { z } from "zod";
import { mappings } from "./data";

export async function POST(request: Request) {
  const { id, value } = z
    .object({
      id: z.string(),
      value: z.string(),
    })
    .parse(await request.json());

  const row = mappings.find((m) => m.id === id)?.row;
  await google
    .sheets({
      version: "v4",
      auth: new google.auth.GoogleAuth({
        credentials: z
          .object({
            private_key: z.string(),
            client_email: z.string(),
          })
          .parse(
            JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS_JSON || "{}")
          ),
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      }),
    })
    .spreadsheets.values.update({
      spreadsheetId: "1ANtyzxFYwz_yuh6D7eRGwMII59YWxb1CM3H5wBY_pGo",
      range: "Invitation!I" + row,
      valueInputOption: "RAW",
      requestBody: {
        values: [[value]],
      },
    });

  return Response.json(
    {
      status: "ok",
    },
    { status: 200 }
  );
}
