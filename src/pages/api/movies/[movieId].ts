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
      return getMovie(req, res);

    default:
      // Devolvemos error si se accede a esta ruta a traves de un método que no definamos

      return res.status(405).json({
        message: 'METHOD_NOT_ALLOWED',
      });
  }
}

const getMovie = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  // Validamos si existe una sessión
  await verifySession(req, res);

  db.Connect();

  // Obtenemos el id de la movie de la query url

  const { movieId } = req.query;

  if (!movieId)
    return res.status(400).json({
      message: 'MOVIE_ID_NO_VALID',
    });

  const movieFound = await Movies.findById(movieId);

  if (!movieFound)
    return res.status(400).json({
      message: 'MOVIE_NOT_FOUND',
    });

  db.Disconnect();

  return res.status(200).json(movieFound);
};
