import React, { useState } from 'react';
import { Box, TextField } from '@skynexui/components';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { ButtonSticker } from '../src/components/ButtonSticker';
import { HeaderChat } from '../src/components/HeaderChat';
import { MessagesList } from '../src/components/MessagesList';

export default function ChatPage() {
  const router = useRouter();
  const loggedUser = router.query.username;
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  return (
    <Box
      styleSheet={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/b/bd/Blue-galaxy-gif-sky-Favim.com-5044543.gif/revision/latest?cb=2018030222122)`,
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover', 
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: "#99212931",
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <HeaderChat />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessagesList 
            messages={messagesList} 
            loggedUser={loggedUser}
          />
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setMessagesList([message, ...messagesList]);
                  setMessage('');
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSticker />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};