import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from './utils/fetcher';
import headers from './utils/headers';
import createEndpoint from './utils/origin';

type WaitlistProps = {
  api_key: string;
  configuration_style_json: {
    social_links: {
      facebook: string;
      instagram: string;
      linkedin: string;
      pinterest: string;
      twitter: string;
    };
    status_description: string;
    status_font_color: string;
    status_main_color: string;
    widget_background_color: string;
    widget_button_color: string;
    widget_font_color: string;
  };
  created_at: string;
  logo: string;
  redirects_to_status_page: boolean;
  spots_to_move_upon_referral: number;
  uses_firstname_lastname: boolean;
  uses_leaderboard: boolean;
  uses_waiter_verification: boolean;
  waitlist_name: string;
  waitlist_url_location: string;
  statistics: {
    current_waiters: number;
    total_signups: number;
  };
};

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

const addWaiterToWaitlist = async (api_key: string, email: string) => {
  const endpoint = createEndpoint('waiter');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, api_key }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<WaiterProps>;
};

const getWaiterFromWaitlist = async (
  api_key: string,
  props: GetWaiterProps
) => {
  let endpoint = '';

  if (props.email) {
    endpoint = createEndpoint(`waiter?api_key=${api_key}&email=${props.email}`);
  } else if (props.uuid) {
    endpoint = createEndpoint(`waiter?api_key=${api_key}&uuid=${props.uuid}`);
  } else {
    throw new Error('Must provide either email or uuid');
  }

  const response = await fetch(endpoint, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<WaiterProps>;
};

const useWaitlist = (
  api_key: string
): {
  data: WaitlistProps | undefined;
  error: Error | undefined;
  add: (email: string) => Promise<WaiterProps | void>;
  get: (props: GetWaiterProps) => Promise<WaiterProps | void>;
} => {
  const endpoint = createEndpoint(`waitlist?api_key=${api_key}`);
  const response = useSWR<WaitlistProps, Error>(endpoint, fetcher);
  const [error, setError] = useState(response.error);

  useEffect(() => {
    if (response.error) {
      setError(response.error);
    }
  }, [response.error]);

  const add = async (email: string) => {
    try {
      return await addWaiterToWaitlist(api_key, email);
    } catch (error) {
      setError(error as Error);
    }
  };

  const get = async (props: GetWaiterProps) => {
    try {
      return await getWaiterFromWaitlist(api_key, props);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { data: response.data, error, add, get };
};

export default useWaitlist;
