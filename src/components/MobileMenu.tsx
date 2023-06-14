import { FC } from 'react';

interface Props {
  visible?: boolean;
}

export const MobileMenu: FC<Props> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className='bg-black w-56 absolute top-8 left-[500px] py-5 flex flex-col border-2 border-gray-800'>
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-center text-white hover:underline'>
          Inicio
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Series
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Películas
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Popular
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Mi Lista
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Buscar por Idioma
        </div>
      </div>
    </div>
  );
};
