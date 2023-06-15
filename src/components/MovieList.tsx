import { FC } from 'react';

import { isEmpty } from 'lodash';
import { IMovie } from '@/interfaces';
import { MovieCard } from './MovieCard';

interface Props {
  data: IMovie[] | undefined;
  title: string;
}

export const MovieList: FC<Props> = ({ data, title }) => {
  if (isEmpty(data)) return null;

  return (
    <div className='px-4 md:px-2 mt-4 space-y-8'>
      <div>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
          {title}
        </p>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
          {data!.map((movie) => (
            <MovieCard key={movie?._id} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 *
 * space-y-8: Cuando aplicas la clase space-y-8 a un contenedor, agrega un margen inferior a cada elemento secundario dentro del contenedor.
 */

/**
 * type Record<string, any>[], lo que significa que se espera un arreglo de objetos donde las claves son de tipo string y los valores pueden ser de cualquier tipo (any).
 */
