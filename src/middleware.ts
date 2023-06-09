import { NextResponse, type NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Obtenemos la sesión del usuario a traves del token

  // TODO: probar con getServerSession

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (session?.user) {
    return NextResponse.redirect('/auth');
  }

  NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
