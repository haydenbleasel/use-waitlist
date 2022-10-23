import useSWR from 'swr';

type WaitlistProps = unknown;

const fetcher = async (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(async (response) => response.json());

const useWaitlist = (
  api_key: string
): {
  data: WaitlistProps | undefined;
  error: Error | undefined;
} => {
  const endpoint = new URL(`/waitlist?api_key=${api_key}`, origin).href;
  const { data, error } = useSWR<WaitlistProps, Error>(endpoint, fetcher);

  return { data, error };
};

export default useWaitlist;
