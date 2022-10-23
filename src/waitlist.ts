import useSWR from 'swr';
import headers from './utils/headers';
import createEndpoint from './utils/origin';

type WaitlistProps = unknown;

type WaiterProps = {
  amount_referred: number;
  created_at: string;
  email: string;
  priority: number;
  referral_link: string;
  referral_token: string;
  referred_by_waiter_token: null;
  removed_date: null;
  removed_priority: null;
  total_waiters_currently: number;
  uuid: string;
  verified: boolean;
  waitlist_id: string;
};

const fetcher = async (url: string) =>
  fetch(url, {
    method: 'GET',
    headers,
  }).then(async (response) => response.json());

const addWaiterToWaitlist = async (api_key: string, email: string) => {
  const endpoint = createEndpoint(`/waitlist?api_key=${api_key}`);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email }),
  });

  return response.json() as Promise<{
    waiter: WaiterProps;
  }>;
};

const useWaitlist = (
  api_key: string
): {
  data: WaitlistProps | undefined;
  error: Error | undefined;
  addWaiter: (email: string) => Promise<{ waiter: WaiterProps }>;
} => {
  const endpoint = createEndpoint(`/waitlist?api_key=${api_key}`);
  const { data, error } = useSWR<WaitlistProps, Error>(endpoint, fetcher);

  const addWaiter = async (email: string) =>
    addWaiterToWaitlist(api_key, email);

  return { data, error, addWaiter };
};

export default useWaitlist;
