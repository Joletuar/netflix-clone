import { useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Billboard, InfoModal, MovieList, Navbar } from '@/components';
import { useFavorites, useMovies } from '@/hooks';
import { ModalContext } from '@/context';

const Home = () => {
  const router = useRouter();
  const { movies, isError, isLoading } = useMovies();
  const { favoritesList } = useFavorites();
  const { isOpen } = useContext(ModalContext);

  if (isLoading && !isError) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <p className='text-white text-3xl'>Cargando...</p>
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <p className='text-white text-3xl'>
          Hubo un error al cargar el contenido.
        </p>
        <button
          className='text-white text-xl mt-4 bg-blue-500 px-4 py-2 rounded'
          onClick={() => router.reload()}
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>NetflixClone - Home</title>
      </Head>
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
