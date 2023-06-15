import { FC, useCallback, useMemo } from 'react';

import axios from 'axios';

import { useCurrentUser, useFavorites } from '@/hooks';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface Props {
  idMovie: string;
}

export const FavoriteButton: FC<Props> = ({ idMovie }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { user, mutate: mutateUser } = useCurrentUser();

  // Verificamos si el id existe o no dentro del listado
  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(idMovie);
  }, [user, idMovie]);

  const toggleFavorites = useCallback(async () => {
    let response;

    // Si está, la eliminamos, caso contrario la agregamos

    if (isFavorite) {
      response = await axios.delete(`/api/movies/favorite/${idMovie}`);
    } else {
      response = await axios.post('/api/movies/favorite', { idMovie });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    // Actualizamos el cache con los datos nuevos del usuario, sin forzar una nueva petición
    mutateUser({
      ...user,
      favoriteIds: updatedFavoriteIds,
    });

    // Forzamos una petición
    mutateFavorites();
  }, [idMovie, isFavorite, user, mutateUser, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
    >
      <Icon className='text-white group-hover/item:text-neutral-300 w-4 lg:w-6' />
    </div>
  );
};
