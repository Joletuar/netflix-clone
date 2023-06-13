import { NextResponse, type NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Obtenemos la sesión del usuario a traves del token

  // No funciona aquí el getServerSession()

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const urlLogin = req.nextUrl.clone();
  urlLogin.pathname = '/auth';

  // Validamos la sesión

  if (!session?.user) {
    return NextResponse.redirect(urlLogin);
  }

  NextResponse.next();
}

export const config = {
  matcher: ['/', '/profiles/:path*'],
};
