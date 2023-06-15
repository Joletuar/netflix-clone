import { Billboard, MovieList, Navbar } from '@/components';
import { useFavorites, useMovies } from '@/hooks';

const Home = () => {
  const { movies, isError, isLoading } = useMovies();
  const { favoritesList } = useFavorites();

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
