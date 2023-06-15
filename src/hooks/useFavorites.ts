import useSWR from 'swr';
import { fetcherAxios } from '@/utils/fetcherAxios';
import { IMovie } from '@/interfaces';

export const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR<IMovie[]>(
    '/api/movies/favorites',
    fetcherAxios,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    favoritesList: data,
    isError: error,
    isLoading,
    mutate,
  };
};
