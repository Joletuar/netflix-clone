import useSWR from 'swr';
import { fetcherAxios } from '@/utils/fetcherAxios';
import { IMovie } from '@/interfaces';

export const useMovie = (movieId: string) => {
  const { data, error, isLoading, mutate } = useSWR<IMovie>(
    `/api/movies/${movieId}`,
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
