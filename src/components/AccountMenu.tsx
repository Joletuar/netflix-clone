import { FC } from 'react';

import Image from 'next/image';
import profile_blue from '../../public/images/default-blue.png';

import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks';

interface Props {
  visisble?: boolean;
}

export const AccountMenu: FC<Props> = ({ visisble }) => {
  const { user } = useCurrentUser();

  if (!visisble) {
    return null;
  }

  return (
    <div className='bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800'>
      <div className='flex flex-col gap-3 '>
        <div className='px-3 group/item flex gap-3 items-center w-full'>
          <Image
            className='w-8 rounded-md'
            src={profile_blue}
            alt='blue profile image'
          />
          <p className='text-white text-sm group-hover/item:underline'>
            {user?.name}
          </p>
        </div>

        {/* Separator */}

        <hr className='bg-gray-600 border-0 h-px my-4' />

        <div
          className='px-3 text-center text-white text-sm hover:underline'
          onClick={() => signOut()}
        >
          Salir de Netflix
        </div>
      </div>
    </div>
  );
};

/**
 * group/item: permite aplicar estilos solo al item cuando se interactua con el contener padre de dicho elemento
 */
