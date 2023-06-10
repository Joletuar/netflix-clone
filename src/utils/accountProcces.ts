import { IAccountDB } from '@/interfaces';
import db from '../database';

import { Accounts } from '@/models';

// actualizamos los datos de la cuenta de usuario, caso contrario se crea uno nuevo

export const updateAccount = async (account: IAccountDB) => {
  await db.Connect();

  try {
    await Accounts.findOneAndUpdate(
      {
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      },
      {
        $set: { ...account },
      },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error saving account:', error);
  } finally {
    await db.Disconnect();
  }
};
