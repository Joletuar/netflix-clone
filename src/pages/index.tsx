import { useContext } from 'react';

import { Billboard, InfoModal, MovieList, Navbar } from '@/components';
import { useFavorites, useMovies } from '@/hooks';
import { ModalContext } from '@/context';

const Home = () => {
  const { movies, isError, isLoading } = useMovies();
  const { favoritesList } = useFavorites();
  const { isOpen } = useContext(ModalContext);

  if (isLoading && !isError) {
    return null;
  }

  if (!isLoading && isError) {
    return (
      <p className='text-4xl text-white font-bold text-center'>
        {' '}
        Hubo un error al cargar las películas...
      </p>
    );
  }

  return (
    <>
      {isOpen && <InfoModal />}

      <Navbar />
      <Billboard />

      <div className='pb-40'>
        <MovieList title='Popular ahora' data={movies} />
        <MovieList title='Favoritos' data={favoritesList ?? []} />
      </div>
    </>
  );
};

export default Home;
