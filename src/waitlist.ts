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

type GetWaiterProps = {
  email?: string;
  uuid?: string;
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

const getWaiterFromWaitlist = async (
  api_key: string,
  props: GetWaiterProps
) => {
  let endpoint = '';

  if (props.email) {
    endpoint = createEndpoint(
      `/waitlist?api_key=${api_key}&email=${props.email}`
    );
  } else if (props.uuid) {
    endpoint = createEndpoint(
      `/waitlist?api_key=${api_key}&uuid=${props.uuid}`
    );
  } else {
    throw new Error('Must provide either email or uuid');
  }

  await fetch(endpoint, {
    method: 'GET',
    headers,
  });
};

const useWaitlist = (
  api_key: string
): {
  data: WaitlistProps | undefined;
  error: Error | undefined;
  addWaiter: (email: string) => Promise<{ waiter: WaiterProps }>;
  getWaiter: (props: GetWaiterProps) => Promise<void>;
} => {
  const endpoint = createEndpoint(`/waitlist?api_key=${api_key}`);
  const { data, error } = useSWR<WaitlistProps, Error>(endpoint, fetcher);

  const addWaiter = async (email: string) =>
    addWaiterToWaitlist(api_key, email);

  const getWaiter = async (props: GetWaiterProps) =>
    getWaiterFromWaitlist(api_key, props);

  return { data, error, addWaiter, getWaiter };
};

export default useWaitlist;
