import { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';
import db from '@/database';
import { Users } from '@/models';

type Response = { message: string } | {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      // Devolvemos error si se accede a esta ruta a traves de un método que no definamos

      return res.status(405).json({
        message: 'METHOD_NOT_ALLOWED',
      });
  }
}

// Función encargada del registro de un nuevo usuario

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const { email, username, password } = req.body;

  try {
    // Conexión a DB

    await db.Connect();

    // Validamos que el correo no esté repetido

    const userFound = await Users.findOne({ email });

    if (userFound) {
      return res.status(400).json({
        message: 'El correo ya se encuentra registrado',
      });
    }

    // Hasheamos el password

    const passwordHashed = await bcrypt.hash(password, 12);

    const newUser = new Users({
      email,
      password: passwordHashed,
      name: username,
      image: '',
      emailVerifiedDate: new Date().toLocaleDateString(),
    });

    await newUser.save();

    return res.status(200).json({
      message: 'Usuario registrado exitosamente',
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: 'BAD_REQUEST',
    });
  } finally {
    await db.Disconnect();
  }
};
