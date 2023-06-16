import { FC, useContext } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { ModalContext } from '@/context';
import { IMovie } from '@/interfaces';

import { FavoriteButton } from './';

import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';

interface Props extends IMovie {}

export const MovieCard: FC<Props> = ({
  _id: id,
  genre,
  thumbnailUrl,
  title,
  duration,
}) => {
  const router = useRouter();

  const { openModal } = useContext(ModalContext);

  return (
    <div className='group bg-zinc-900 col-span relative h-[12vw]'>
      <Image
        className='w-full cursor-pointer object-cover transition shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 h-[12vw]'
        src={thumbnailUrl}
        alt={`thumbnail ${title}`}
        width={500}
        height={500}
      />

      <div className='opacity-0 absolute top-0 transition ease-in-out duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100'>
        <Image
          className='cursor-pointer object-cover transition shadow-xl rounded-t-md w-fit'
          src={thumbnailUrl}
          alt={`thumbnail ${title}`}
          width={500}
          height={500}
          priority
        />

        <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute transition shadow-md rounded-b-md w-full'>
          <div className='flex items-center gap-3'>
            <div
              className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'
              onClick={() => router.push(`/watch/${id}`)}
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton idMovie={id} />

            <div
              className='cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'
              onClick={() => openModal(id)}
            >
              <BiChevronDown
                size={30}
                className='text-white group-hover/item:text-neutral-300'
              />
            </div>
          </div>

          <p className='text-green-400 font-semibold mt-4'>
            Lo nuevo del <span className='text-white '>2023</span>
          </p>

          <div className='flex mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>{duration}</p>
          </div>

          <div className='flex mt-4 gap-2 items-center'>
            <p className='text-white text-[10px] lg:text-sm'>{genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
