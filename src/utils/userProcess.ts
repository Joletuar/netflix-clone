import { IUserDB } from '@/interfaces';
import db from '../database';

import { User } from '@/models';

// verificamos si un usuario existe o no en la bd

export const getUser = async (email: string = '') => {
  await db.Connect();
  const userFound = await User.findOne({ email });
  await db.Disconnect();

  return userFound;
};

// actualizamos los datos del usuario si existe, caso contrario se crea uno nuevo

export const updateUser = async (
  emailSearch: string = '',
  userData: IUserDB
) => {
  await db.Connect();

  try {
    await User.findOneAndUpdate(
      { email: emailSearch },
      {
        $set: {
          ...userData,
          password: userData?.password ? userData.password : '@',
        },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error saving user:', error);
  } finally {
    await db.Disconnect();
  }
};