import useSWR from 'swr';

type LeaderboardProps = {
  email: string;
  amount_referred: number;
}[];

const fetcher = async (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(async (response) => response.json());

const useLeaderboard = (
  api_key: string,
  number_of_waiters: number
): {
  data: LeaderboardProps | undefined;
  error: Error | undefined;
} => {
  const endpoint = new URL(
    `/waitlist/${api_key}/leaderboard?number_of_waiters=${number_of_waiters}`,
    origin
  ).href;

  const { data, error } = useSWR<LeaderboardProps, Error>(endpoint, fetcher);

  return { data, error };
};

export default useLeaderboard;
