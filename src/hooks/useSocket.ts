import { useContext, useEffect, useState } from 'react';
import SocketContext from '../contexts/SocketContext';
import { Events } from '../utils/constants';

function useSocket<T>(event: Events, callback?: (data: T) => void) {
  const [data, setData] = useState<T>();
  const { client } = useContext(SocketContext);

  useEffect(() => {
    client.on(event, (data: T) => {
      setData(data);

      if (callback) {
        callback(data);
      }
    });
    return () => {
      client.off(event);
    };
  }, [client, event, callback]);

  return data;
}

export default useSocket;
