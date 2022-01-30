import React, { useState, useEffect } from "react";
import { Box, TextField } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { ButtonSticker } from "../src/components/ButtonSticker";
import { HeaderChat } from "../src/components/HeaderChat";
import { MessagesList } from "../src/components/MessagesList";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzMDYyMywiZXhwIjoxOTU4OTA2NjIzfQ.q66bELWqYwTWn0wRXeWYCkwj2hU7WAd9Qv74OUJ5b38";
const SUPABASE_URL = "https://nnpuckbovqhvfiihipxh.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const getMessages = (addMessage) => {
  return supabaseClient
    .from("messages")
    .on("INSERT", (res) => {
      addMessage(res.new);
    })
    .subscribe();
};

export default function ChatPage() {
  const [messagesList, setMessagesList] = useState([]);
  useEffect(() => {
    const supabaseDB = supabaseClient
      .from("messages")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setMessagesList(data);
      });
    getMessages((newMessage) => {
      setMessagesList((currentValueList) => {
        return [newMessage, ...currentValueList];
      });
    });
  }, []);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const loggedUser = router.query.username;
  const handleNewMessage = (newMessage) => {
    const msg = {
      from: loggedUser,
      text: newMessage,
    };
    supabaseClient
      .from("messages")
      .insert([msg])
      .then(({ data }) => {});
    setMessage("");
  };
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3F9142",
        backgroundImage:
          "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: "#FFFFFF",
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: "#212931",
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <HeaderChat />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: "#29333D",
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessagesList messagesList={messagesList} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: 0,
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: "#181F25",
                marginRight: "12px",
                color: "#CBD2D9",
              }}
            />
            <ButtonSticker
              onStickerClick={(sticker) => {
                handleNewMessage(`:sticker:${sticker}`);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
