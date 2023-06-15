import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/database';
import { Users } from '@/models';
import { verifySession } from '@/utils';

type Response = { message: string } | null | string[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return getFavoritesMoviesList(req, res);

    default:
      // Devolvemos error si se accede a esta ruta a traves de un método que no definamos

      return res.status(405).json({
        message: 'METHOD_NOT_ALLOWED',
      });
  }
}

const getFavoritesMoviesList = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  // Validamos si existe una sessión
  const session = await verifySession(req, res);

  // Obtenemos el usuario
  const user = session?.user;

  // Obtenemos el listado de peliculas favoritas

  const favoritesMoviesList = await Users.findById(user!.id)
    .populate('favoriteIds')
    .select('-_id favoriteIds')
    .lean();

  db.Disconnect();

  return res.status(200).json((favoritesMoviesList!.favoriteIds as []) ?? []);
};
