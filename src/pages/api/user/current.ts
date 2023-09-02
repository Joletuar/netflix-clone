import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/database';
import { Users } from '@/models';
import { verifySession } from '@/utils';

type Response = { message: string } | {};

// shorcut: napi

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case 'GET':
      return getUser(req, res);

    default:
      // Devolvemos error si se accede a esta ruta a traves de un método que no definamos

      return res.status(405).json({
        message: 'METHOD_NOT_ALLOWED',
      });
  }
}

// Obtenemos la info del user

const getUser = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  // Verificamos existe un sesión activa
  // Si funcion getServerSideSession en el api

  const session = await verifySession(req, res);

  // Obtenemos el user

  await db.Connect();

  const userFond = await Users.findById(session?.user?.id);

  await db.Disconnect();

  if (!userFond) {
    return res.status(401).json({
      message: 'USER_NOT_SIGN_IN',
    });
  }

  return res.status(200).json(userFond);
};
