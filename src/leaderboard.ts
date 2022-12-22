import useSWR from 'swr';
import fetcher from './utils/fetcher';
import createEndpoint from './utils/origin';

type LeaderboardProps = {
  email: string;
  amount_referred: number;
}[];

const useLeaderboard = (
  api_key: string,
  number_of_waiters = 5
): {
  data: LeaderboardProps | undefined;
  error: Error | undefined;
} => {
  const endpoint = createEndpoint(
    `waitlist/${api_key}/leaderboard?number_of_waiters=${number_of_waiters}`
  );

  const { data, error } = useSWR<LeaderboardProps, Error>(endpoint, fetcher);

  return { data, error };
};

export default useLeaderboard;
