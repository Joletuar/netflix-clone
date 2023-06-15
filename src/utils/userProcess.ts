import db from '../database';
import bcrypt from 'bcrypt';

import { Users } from '@/models';
import { IAccount } from '@/interfaces';

// verificamos si un usuario existe o no en la bd

export const getUser = async (emailIn: string) => {
  await db.Connect();
  const userFound = await Users.findOne({ email: emailIn }).lean();
  await db.Disconnect();

  return userFound;
};

export const createNewUserOauth = async (
  username: string,
  email: string,
  password: string,
  account?: IAccount
) => {
  // Conexión a DB

  await db.Connect();

  // Validamos que el correo no esté repetido

  const userFound = await Users.findOne({ email });

  if (userFound) {
    // Obtenemos todos los providers del usuario

    const listProviders = userFound.accounts?.map((provider) =>
      provider.toString()
    );

    // Verificamos ya tiene la cuenta asociada

    const existAccount = listProviders?.includes(account?._id?.toString()!);

    if (existAccount) {
      await db.Disconnect();
      return;
    }

    // Actualizamos el listado de accounts para un mismo usuario

    userFound.accounts = [
      ...listProviders!,
      account?._id?.toString()!,
    ] as string[];

    userFound.save();
    await db.Disconnect();
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
    accounts: [account?._id?.toString()!],
  });

  await newUser.save();
  await db.Disconnect();
};
