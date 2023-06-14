import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth';

import { CustomSession, authOptions } from '@/pages/api/auth/[...nextauth]';

export const verifySession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session: CustomSession | null = await getServerSession(
    req,
    res,
    authOptions
  );

  if (!session?.user?.email) {
    return res.status(401).json({
      message: 'NOT_SESSION',
    });
  }

  return session;
};
