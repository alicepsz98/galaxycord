import React, { useState, useEffect } from "react";
import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import appConfig from "../config.json";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzMDYyMywiZXhwIjoxOTU4OTA2NjIzfQ.q66bELWqYwTWn0wRXeWYCkwj2hU7WAd9Qv74OUJ5b38';
const SUPABASE_URL = 'https://nnpuckbovqhvfiihipxh.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState('');
  const handleNewMessage = (newMessage) => {
    const msg = {
      // id: messagesList.length + 1,
      from: 'Alguém',
      text: newMessage
    };
    supabaseClient 
      .from('messages')
      .insert([msg])
      .then(({data}) => {
        setMessagesList([
          data[0],
          ...messagesList,
        ]);
      });
    setMessage('');
  };
  useEffect(() => {
    const supabaseDB = supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(({data}) => {
        setMessagesList(data)
      });
  }, []);
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messagesList={messagesList} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              onChange={e => setMessage(e.target.value)}
              value={message}
              onKeyPress={e => {
                if(e.key === 'Enter') {
                  e.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messagesList.map(message => (
        <Text
          key={message.id}
          tag="li"
          styleSheet={{
            borderRadius: "5px",
            padding: "6px",
            marginBottom: "12px",
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            },
          }}
        >
          <Box
            styleSheet={{
              marginBottom: "8px",
            }}
          >
            <Image
              styleSheet={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              }}
              src={`https://github.com/${message.from}.png`}
            />
            <Text tag="strong">{message.from}</Text>
            <Text
              styleSheet={{
                fontSize: "10px",
                marginLeft: "8px",
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {new Date().toLocaleDateString()}
            </Text>
          </Box>
          {message.text}
        </Text>
      ))}
    </Box>
  );
};
