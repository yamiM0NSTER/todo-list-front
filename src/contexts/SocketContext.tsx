import React from 'react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { useApi } from '../hooks/useApi';
import { Events } from '../utils/constants';

type SocketContextType = {
  client: Socket;
};

const SocketContext = createContext<SocketContextType>({
  client: {} as Socket,
});

const client = io(process.env.REACT_APP_WS_URL || '/', {
  transports: ['websocket'],
  secure: true,
});

export function SocketContextProvider({ children }: { children: ReactNode }) {
  const [socket] = useState<Socket>(client);

  const [, loading, error, request] = useApi({
    config: {
      url: '/api/auth/me',
      method: 'GET',
    },
    onError: () => {},
  });

  useEffect(() => {
    socket.on(Events.Connect, function () {
      console.log('Connected!');
      request();
    });
    socket.on(Events.Reconnect, function () {
      console.log('Reconnected!');
      request();
    });
    socket.on(Events.Disconnect, function () {
      console.log('Disconnected!');
    });
  }, [socket]);

  return (
    <>
      {error ? (
        <Redirect to={{ pathname: '/login' }}></Redirect>
      ) : (
        <SocketContext.Provider value={{ client: socket }}>
          {children}
        </SocketContext.Provider>
      )}
    </>
  );
}

export default SocketContext;
