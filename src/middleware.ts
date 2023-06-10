import { NextResponse, type NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Obtenemos la sesión del usuario a traves del token

  // TODO: probar con getServerSession

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.clone();
  url.pathname = '/auth';

  if (!session?.user) {
    return NextResponse.redirect(url);
  }

  NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
