import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/database';
import { Movies } from '@/models';
import { verifySession } from '@/utils';

type Response = { message: string } | {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getRandomMovie(req, res);

    default:
      // Devolvemos error si se accede a esta ruta a traves de un método que no definamos

      return res.status(405).json({
        message: 'METHOD_NOT_ALLOWED',
      });
  }
}

const getRandomMovie = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  // Validamos si existe una sessión
  await verifySession(req, res);

  await db.Connect();

  // Obtenemos el numero total de movies en la db
  const movieCount = await Movies.estimatedDocumentCount();

  // Generamos un indice random
  const randomIndex = Math.floor(Math.random() * movieCount);

  // Obtenemos una movie random

  const movieRandom = await Movies.find() // devuelve un arreglo
    .limit(1) // limita el número de documentos obtenidos
    .skip(randomIndex) // especifica el numero de documentos a saltarse, es decir, va a devolver documentos a partir de la posicion (n+1)
    .lean()
    .exec();

  await db.Disconnect();

  return res.status(200).json(movieRandom[0]);
};
