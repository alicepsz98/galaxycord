import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const router = useRouter();
  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/b/bd/Blue-galaxy-gif-sky-Favim.com-5044543.gif/revision/latest?cb=20180302221226)',
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover', 
          backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', 
            maxWidth: '700px',
            borderRadius: '5px', 
            padding: '32px', 
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: "#99212931",
          }}
        >
          <Box
            as="form"
            onSubmit={e => {
              e.preventDefault();
              router.push(`/chat?username=${username}`);
              // window.location.href = '/chat';
            }}
            styleSheet={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, 
              textAlign: 'center', 
              marginBottom: '32px',
            }}
          >
            <h2>Galaxyc✩rd</h2>
            <style jsx>{`
              h2 {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 28px;
                font-weight: 500;
              }
            `}</style>
            <Text 
              variant="body3" 
              styleSheet={{ 
                marginBottom: '32px', 
                color: appConfig.theme.colors.neutrals[300] 
              }}
            >
              Boas-vindas de volta!
            </Text>
            <TextField
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Seu nome de usuário do github..."
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor:"#4269e1",
                mainColorStrong: "#00f",
              }}
            />
          </Box>
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={username 
                ? `https://github.com/${username}.png`
                : 'https://th.bing.com/th/id/R.36cc8ff2efe66a043fc97b383fc11f23?rik=xljQ8hSZp9YS2w&pid=ImgRaw&r=0'
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username
                ? username
                : 'gatinho_do_github'
              }
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};