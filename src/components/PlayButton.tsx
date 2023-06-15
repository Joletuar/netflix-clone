import { FC } from 'react';

import { useRouter } from 'next/router';

import { BsFillPlayFill } from 'react-icons/bs';

interface Props {
  movieId: string;
}

export const PlayButton: FC<Props> = ({ movieId }) => {
  const router = useRouter();

  return (
    <div
      className='bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-neutral-300 transition cursor-pointer'
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      Reproducir
      <BsFillPlayFill size={30} className='mr-1' />
    </div>
  );
};
