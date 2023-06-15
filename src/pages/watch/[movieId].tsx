import { useRouter } from 'next/router';

import { useMovie } from '@/hooks';

import { AiOutlineArrowLeft } from 'react-icons/ai';

const WatchHome = () => {
  const router = useRouter();

  const { movieId } = router.query;

  const { movie, isError, isLoading } = useMovie(movieId as string);

  if (isLoading && !isError) {
    return null;
  }

  if (!isLoading && isError) {
    return (
      <p className='text-white text-3xl'>
        Hubo un error al cargar el contenido
      </p>
    );
  }

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed w-full p-4 z-10 flex items-center gap-8 bg-black bg-opacity-70'>
        <AiOutlineArrowLeft
          className='text-white cursor-pointer'
          size={40}
          onClick={() => router.back()}
        />
        <p className='text-white text-xl md:text-3xl font-bold'>
          <span className='font-light'>Viendo: </span>
          {movie?.title}
        </p>
      </nav>
      <video
        className='w-full h-full object-cover'
        controls
        poster={movie?.thumbnailUrl}
        src={movie?.videoUrl}
      />
    </div>
  );
};

export default WatchHome;
