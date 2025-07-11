import { useEffect, useState } from 'react';
import axios from 'axios';

const apiHost = process.env.VITE_SERVER_HOST;
const apiPort = process.env.VITE_SERVER_PORT;

const apiHost2 = import.meta.env.VITE_SERVER_HOST;
const apiPort2= import.meta.env.VITE_SERVER_PORT;

export default function useFetch(path, options = {}, method = 'GET', dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(method === 'GET'); // only auto-load if GET
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}${path}`,
          {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...(options.headers || {}),
            },
            body: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
              ? JSON.stringify(options.body || {})
              : null,
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (method === 'GET') {
      fetchData();
    }

    return () => controller.abort();
  }, [path, method, JSON.stringify(options), ...dependencies]);

  const refetch = async (customOptions = {}) => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}${path}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(customOptions.headers || options.headers || {}),
          },
          body: JSON.stringify(customOptions.body || options.body || {}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return { data, loading, error, refetch };
}
