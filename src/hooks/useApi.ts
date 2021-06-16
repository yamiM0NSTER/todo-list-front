import { AxiosRequestConfig } from 'axios';
import { useRef, useState } from 'react';
import { axiosInstance } from '../axiosInstance';

type Inputs<T> = {
  config: AxiosRequestConfig;
  onSuccess?: (data: T) => Promise<void>;
  onError?: (error: string) => void;
};

export const useApi = <ReturnType, PayloadType>({
  onSuccess,
  onError,
  config,
}: Inputs<ReturnType>) => {
  const [loading, setLoading] = useState(false);
  const error = useRef<string | undefined>(undefined);
  const data = useRef<ReturnType | undefined>(undefined);

  const requestFunc = async (payload?: PayloadType) => {
    const cfg = {
      ...config,
    };

    if (payload) {
      cfg.data = payload;
    }

    error.current = undefined;
    data.current = undefined;
    setLoading(true);

    try {
      const response = await axiosInstance.request(cfg);
      data.current = response.data;
      if (onSuccess) {
        await onSuccess(data.current!);
      }
    } catch (err) {
      if (err.response) {
        // Request made and server responded
        error.current = err.response.data.message;
      } else if (err.request) {
        error.current = 'No response from server was received';
        // The request was made but no response was received
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error:');
        console.log(err);
        error.current = err.message;
      }
      if (onError) {
        onError(error.current!);
      }
    }
    setLoading(false);
  };

  return [data.current, loading, error.current, requestFunc] as const;
};
