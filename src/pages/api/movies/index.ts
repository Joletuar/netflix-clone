import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/database';
import { Movies } from '@/models';
import { verifySession } from '@/utils';

type Response = { message: string } | {}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getMovies(req, res);

    default:
      // Devolvemos error si se accede a esta ruta a traves de un método que no definamos

      return res.status(405).json({
        message: 'METHOD_NOT_ALLOWED',
      });
  }
}

const getMovies = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  // Validamos si existe una sessión
  await verifySession(req, res);

  await db.Connect();

  // Obtenemos todas las movies
  const movies = await Movies.find();

  await db.Disconnect();

  return res.status(200).json(movies);
};
