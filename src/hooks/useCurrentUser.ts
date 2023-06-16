import useSWR from 'swr';
import { fetcherAxios } from '@/utils/fetcherAxios';
import { IUser } from '@/interfaces';

// hook que permite obtener la info de un user usando swr

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<IUser>(
    '/api/user/current',
    fetcherAxios
  );

  return {
    user: data,
    isError: error,
    isLoading,
    mutate,
  };
};
