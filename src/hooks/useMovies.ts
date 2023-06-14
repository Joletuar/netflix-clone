import useSWR from 'swr';
import { fetcherAxios } from '@/utils/fetcherAxios';
import { IMovie } from '@/interfaces';

export const useMovies = () => {
  const { data, error, isLoading, mutate } = useSWR<IMovie[]>(
    '/api/movies',
    fetcherAxios,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    movies: data,
    isError: error,
    isLoading,
    mutate,
  };
};
