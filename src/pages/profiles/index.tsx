import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';

import profile_blue from '../../../public/images/default-blue.png';

import { useCurrentUser } from '@/hooks';

const ProfilePage = () => {
  const router = useRouter();
  const { user, isLoading, isError } = useCurrentUser();

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
          Hubo un error al cargar los perfiles.
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
        <title>NetflixClone - Profiles</title>
      </Head>
      <div className='flex justify-center items-center h-full'>
        <div className='flex flex-col'>
          <h1 className='text-3xl md:text-6xl text-white text-center'>
            Elige tu perfil
          </h1>

          <div className='flex justify-center items-center gap-8 mt-10'>
            <div onClick={() => router.replace('/')}>
              <div className='group flex flex-col w-44 mx-auto'>
                <div className='w-44 h-44 rounded-md flex justify-center items-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                  <Image
                    className='w-fit h-full'
                    src={profile_blue}
                    alt='image blue profile'
                  />
                </div>
                <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                  {user?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

/**
 * group: permite aplicar estilos cuando se realiza un accion sobre el contenedor padre
 */
