import type { Fetcher } from 'swr';
import headers from './headers';

const fetcher: Fetcher<never> = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as never;
};

export default fetcher;
