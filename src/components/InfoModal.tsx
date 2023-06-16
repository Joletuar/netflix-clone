import { useContext } from 'react';
import { useRouter } from 'next/router';

import { ModalContext } from '@/context';
import { useMovie } from '@/hooks';

import { AiOutlineClose } from 'react-icons/ai';
import { PlayButton } from './PlayButton';
import { FavoriteButton } from './FavoriteButton';

export const InfoModal = () => {
  const router = useRouter();
  const { movieId, closeModal } = useContext(ModalContext);
  const { movie, isError, isLoading } = useMovie(movieId!);

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

  const handleClose = () => {
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    // Contendor del modal
    <div className='fixed inset-0 flex items-center justify-center z-[999] transition duration-300 bg-opacity-80 overflow-x-hidden overflow-y-hidden m-5'>
      <div className='relative w-full max-w-3xl rounded-md overflow-hidden'>
        <div className='relative flex-auto bg-zinc-900 drop-shadow-md'>
          <div className='relative h-80'>
            <video
              className='w-full h-full object-cover brightness-[60%]'
              autoPlay
              muted
              poster={movie?.thumbnailUrl}
              src={movie?.videoUrl}
            />

            <div
              onClick={handleClose}
              className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex justify-center items-center'
            >
              <AiOutlineClose className='text-white' size={25} />
            </div>

            <div className='absolute bottom-[10%] left-10'>
              <p className='text-white text-3xl md:text-4xl lg:text-5xl h-full font-bold'>
                {movie?.title}
              </p>

              <div className='flex gap-4 items-center mt-8'>
                <PlayButton movieId={movie?._id.toString()!} />

                <FavoriteButton idMovie={movie?._id.toString()!} />
              </div>
            </div>
          </div>

          <div className='px-12 py-8'>
            <p className='text-green-400 font-semibold text-lg'>Nuevo</p>
            <p className='text-neutral-100 font-semibold text-lg'>
              {movie?.duration}
            </p>
            <p className='text-neutral-100 font-semibold text-lg'>
              {movie?.genre}
            </p>
            <p className='text-neutral-100 font-semibold text-lg'>
              {movie?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
