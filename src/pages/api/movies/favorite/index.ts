import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/database';
import { Movies, Users } from '@/models';
import { verifySession } from '@/utils';

type Response = { message: string } | {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      return addMovieToList(req, res);

    default:
      // Devolvemos error si se accede a esta ruta a traves de un método que no definamos

      return res.status(405).json({
        message: 'METHOD_NOT_ALLOWED',
      });
  }
}

// Agregar un nuevo id al listado de películas por usuario

const addMovieToList = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  // Validamos si existe una sessión
  const session = await verifySession(req, res);

  // Obtenemos el usuario
  const user = session?.user;

  await db.Connect();

  // Validamos que exista el usuario

  const isValidUser = await Users.findById(user?.id);

  if (!isValidUser)
    return res.status(400).json({
      message: 'USER_ID_NO_VALID',
    });

  // Validamos que exista la movie

  const { idMovie } = req.body;

  const isValidMovie = await Movies.findById({ _id: idMovie });

  if (!isValidMovie)
    return res.status(400).json({
      message: 'MOVIE_ID_NO_VALID',
    });

  isValidUser.favoriteIds = [...isValidUser.favoriteIds!, isValidMovie.id];

  const updatedUser = await isValidUser.save();

  await db.Disconnect();

  return res.status(200).json(updatedUser);
};
