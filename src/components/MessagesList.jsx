import React from 'react';
import appConfig from '../../config.json';
import { Box, Text, Image } from '@skynexui/components';

export function MessagesList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: 'auto',
        scrollbarCollor: 'dark',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {props.messages && props.messages.map((message) => {
        return (
          <Text
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                styleSheet={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${props.loggedUser}.png`}
              />
              <Text
                tag="p"
                styleSheet={{ color: "#c7b0cc" }}
              >
                {props.loggedUser}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
            </Box>
            {message.startsWith(':sticker:')
              ? <img
                src={message.replace(':sticker:', '')}
                style={{
                  width: 180
                }}
              />
              : message
            }
          </Text>
        );
      })}
    </Box>
  );
};