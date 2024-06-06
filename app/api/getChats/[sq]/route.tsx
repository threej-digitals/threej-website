import { query } from "@/lib/db";
import response from "@/lib/resp";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sq: string } }
) {
  const { sq } = params;

  try {
    //fetch game details first
    const [rows] = await query(
      "SELECT * FROM tg_chats_table WHERE TITLE LIKE ? OR DESCRIPTION LIKE ? LIMIT 20",
      [`%${sq}%`, `%${sq}%`]
    );

    return response("fetched", true, rows);
  } catch (e) {
    console.log(e);
  }
}
