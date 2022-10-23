import useSWR from 'swr';
import headers from './utils/headers';
import createEndpoint from './utils/origin';

type LeaderboardProps = {
  email: string;
  amount_referred: number;
}[];

const fetcher = async (url: string) =>
  fetch(url, {
    method: 'GET',
    headers,
  }).then(async (response) => response.json());

const useLeaderboard = (
  api_key: string,
  number_of_waiters: number
): {
  data: LeaderboardProps | undefined;
  error: Error | undefined;
} => {
  const endpoint = createEndpoint(
    `/waitlist/${api_key}/leaderboard?number_of_waiters=${number_of_waiters}`
  );

  const { data, error } = useSWR<LeaderboardProps, Error>(endpoint, fetcher);

  return { data, error };
};

export default useLeaderboard;
