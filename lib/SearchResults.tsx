"use client";
import { useEffect, useState } from "react";

interface chats {
  USERNAME: string;
  CID: number;
  CHATID: number;
  TITLE: string;
  DESCRIPTION: string;
  CTYPE: string;
  UPVOTES: number;
  FLAG: number;
  REPORT: number;
}
export default function SearchResults({ styles }: { styles: any }) {
  const [chats, setChat] = useState([
    {
      USERNAME: "directorygram",
      CID: 0,
      CHATID: 0,
      TITLE: "Telegram Channels Directory",
      DESCRIPTION: `Follow to get daily new channels from vast variety of categories. 

Telegram channels, groups and stickers directory provided by threej.in

Add your chat 👉 @threej_bot`,
      CTYPE: "channel",
      UPVOTES: 0,
      FLAG: 0,
      REPORT: 0,
    },
  ] as [chats]);

  return (
    <>
      {/* header */}
      <div className={styles.header}>
        {/* search bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2>Telegram global search</h2>
          <div
            style={{
              display: "flex",
            }}
          >
            <input
              id="search"
              type="text"
              className={styles.input}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  getChats((e.target as HTMLInputElement).value);
                }
              }}
            />
            <button
              className={styles.searchBtn}
              onClick={(e) => {
                getChats(
                  (e.target as HTMLInputElement).parentElement!.querySelector(
                    "input"
                  )!.value
                );
              }}
            >
              🔎
            </button>
          </div>
        </div>
        <div>
          <button
            style={{
              background: "none",
            }}
            onClick={() => {
              document.getElementById("newChat")!.style.display = "flex";
            }}
          >
            ➕ chat
          </button>
          <span
            style={{ cursor: "pointer", fontSize: "20px", marginLeft: "20px" }}
          >
            ⚙️
          </span>
        </div>
      </div>

      {/* chats card */}
      <div className={styles.chatsContainer}>
        {chats.map((e) => (
          <div key={e.CHATID} className={styles.card}>
            <h4>
              {e.CTYPE == "channel" ? "📢" : "👥💬"} {e.TITLE}
            </h4>
            <a href={"http://telegram.me/" + e.USERNAME} target="_blank">
              {e.USERNAME}
            </a>
            <br />
            <p
              className="desc"
              dangerouslySetInnerHTML={{ __html: e.DESCRIPTION }}
            ></p>

            {e.CTYPE == "channel" ? (
              <input
                type="text"
                placeholder="🔎 Search this channel"
                onKeyUp={(ev) => {
                  if (ev.key == "Enter") {
                    const url =
                      "https://t.me/s/" +
                      e.USERNAME +
                      "?q=" +
                      (ev.target as HTMLInputElement).value;
                    console.log(url);

                    window.open(
                      url,
                      "_blank",
                      "location=yes,height=570,width=520,scrollbars=yes,status=yes,noopener=yes"
                    );
                  }
                }}
              />
            ) : (
              ""
            )}

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              {e.CTYPE == "channel" ? (
                <>
                  <button onClick={() => showPreview(e.USERNAME)}>👁️</button>
                </>
              ) : (
                ""
              )}
              <button style={{ width: "100%" }}>
                Similar {e.CTYPE == "channel" ? "" : "chats"} →{" "}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div id="newChat" className={styles.newChat}>
        <span
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            document.getElementById("newChat")!.style.display = "none";
          }}
        >
          ⚔️
        </span>
        <input type="text" name="" id="" placeholder="Enter username" />
        <button
          onClick={() => {
            const username = (
              document.querySelector("#newChat input")! as HTMLInputElement
            ).value;

            const target = document.querySelector("div.newChatDetail");
            target!.innerHTML = `<p>processing...</p>`;
            fetch("/api/newChat/" + username, {})
              .then((data) => data.json())
              .then((data) => {
                if (data.ok) {
                  if (data.data.ok) {
                    const chat = data.data.result;
                    const temp = `<b>Chat added to DB, Thanks for your contribution!</b><br><br><p>title: ${chat.title}<br><br>desc:${chat.description}</p>`;
                    target!.innerHTML = temp;
                  } else {
                    target!.innerHTML = `Chat detail not found`;
                  }
                } else {
                  target!.innerHTML = `unknown error`;
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          Get chat details
        </button>

        <div className="newChatDetail"></div>
      </div>
    </>
  );

  function showPreview(chat: string) {
    window.open(
      "https://t.me/s/" + chat,
      "_blank",
      "location=yes,height=570,width=520,scrollbars=yes,status=yes"
    );
  }

  function getChats(query: string) {
    fetch("/api/getChats/" + query, {})
      .then((data) => data.json())
      .then((data) => {
        if (data.ok) {
          setChat(data.data);
        }
      })
      .catch((e) => {
        console.log(e);
        return [];
      });
  }
}
