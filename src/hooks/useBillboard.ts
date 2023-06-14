import useSWR from 'swr';
import { fetcherAxios } from '@/utils/fetcherAxios';
import { IMovie } from '@/interfaces';

export const useBillboard = () => {
  const { data, error, isLoading, mutate } = useSWR<IMovie>(
    '/api/movies/random',
    fetcherAxios,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    movie: data,
    isError: error,
    isLoading,
    mutate,
  };
};
