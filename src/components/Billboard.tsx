import { useContext } from 'react';
import { useRouter } from 'next/router';

import { useBillboard } from '@/hooks';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { PlayButton } from './PlayButton';
import { ModalContext } from '@/context';

export const Billboard = () => {
  const router = useRouter();
  const { movie, isError, isLoading } = useBillboard();
  const { openModal } = useContext(ModalContext);

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
    <div className='relative h-[56.25vw]'>
      <video
        className='w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500'
        autoPlay
        muted
        loop
        poster={movie?.thumbnailUrl}
        src={movie?.videoUrl}
      />

      <div className='absolute top-[27%] ml-4 md:top-[40%] md:ml-16'>
        <p className='text-white text-xl md:text-5xl h-full w-1/2 lg:text-6xl font-bold drop-shadow-xl'>
          {movie?.title}
        </p>

        <p className='text-white text-xs md:text-lg mt-3 md:mt-8 w-11/12 md:w-4/5 lg:w-1/2 drop-shadow-xl'>
          {movie?.description}
        </p>

        <div className='flex items-center mt-3 md:mt-4 gap-3'>
          <PlayButton movieId={movie?._id!} />
          <button
            className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg flex gap-2 items-center hover:bg-opacity-20 transition'
            onClick={() => openModal(movie?._id.toString()!)}
          >
            <AiOutlineInfoCircle />
            Más información
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * brightness-[60%]: ajusta el brillo del elemento
 * drop-shadow-xl: aplicar un sombra sobre un elemento
 */
