import { query } from "@/lib/db";
import response from "@/lib/resp";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  try {
    let url =
      "https://api.telegram.org/bot6339627009:AAGd13atN0HZgyGTIYiyWoopPd9pHmsWiAg/getchat?chat_id=%40" +
      username;

    let options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };

    const res = await fetch(url, options);
    const json = await res.json();

    if (json.ok) {
      const chat = json.result;
      let result = await query(
        "UPDATE tg_chats_table set TITLE = ?, DESCRIPTION = ? WHERE CHATID = ?",
        [chat.title || "", chat.description || "", chat.id]
      );

      //insert into database
      if (result[0].affectedRows == 0) {
        result = await query(
          "INSERT INTO tg_chats_table(CHATID, TITLE, DESCRIPTION, USERNAME, CTYPE) VALUES(?,?,?,?,?)",
          [
            chat.id || null,
            chat.title || "",
            chat.description || "",
            chat.username || null,
            chat.type || "",
          ]
        );
      }
    }

    return response("", true, json);
  } catch (e) {
    console.log(e);
    return response("error", false);
  }
}
