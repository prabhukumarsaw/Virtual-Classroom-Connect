import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (url) => {
  const { current: socket } = useRef(io(url));

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [url]);

  return socket;
};
