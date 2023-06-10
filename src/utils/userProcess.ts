import db from '../database';
import bcrypt from 'bcrypt';

import { Users } from '@/models';

// verificamos si un usuario existe o no en la bd

export const getUser = async (emailIn: string) => {
  await db.Connect();
  const userFound = await Users.findOne({ email: emailIn }).lean();
  await db.Disconnect();

  return userFound;
};

export const createNewUserOauth = async (
  email: string,
  username: string,
  password: string
) => {
  // Conexión a DB

  await db.Connect();

  // Validamos que el correo no esté repetido

  const userFound = await Users.findOne({ email }).lean();

  if (userFound) {
    return;
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

  await db.Disconnect();
};
