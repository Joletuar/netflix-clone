import NextAuth, { NextAuthOptions, Session } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { compare } from 'bcrypt';
import { getUser, updateAccount, updateUser } from '@/utils';
import { IUserDB } from '@/interfaces';

interface CustomSession extends Session {
  access_token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET_KEY || '',
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY || '',
    }),

    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        // Campos que vamos a validar

        email: {
          label: 'Email',
          type: 'text',
        },

        password: {
          label: 'Password',
          type: 'password',
        },
      },

      // Función que ejecuta la lógica para verificar las credenciales del usuario
      /**
       * Esta proceso se ejecuta cuando llamamos el hook signIn dentro de nuestra App
       */

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        // Si no ingreso los campos, error

        if (!email || !password) {
          throw new Error('Email y password son requeridos');
        }

        // Conexión a BD y busqueda el usuario

        const userFound = await getUser(email);

        // Si no existe en BD, error

        if (!userFound || !userFound?.password) {
          throw new Error('El usuario no se encuentra registrado');
        }

        // Si la contraseña no coincide con la de la BD, error

        const isCorrectPassword = await compare(password, userFound.password);

        if (!isCorrectPassword) {
          throw new Error('El password es incorrecto');
        }

        // Devolver el usuario autorizado con los campos requeridos:
        /**
         * id: requerido siempre
         * resto: opcionales
         */

        return {
          id: userFound._id,
          ...userFound,
        };
      },
    }),
  ],

  // Definimos las páginas de Sign in y Login

  pages: {
    signIn: '/auth',
  },

  // Con esto podemos ver los errores en la terminal, siempre y cuando estemos en desarrollo

  debug: process.env.NODE_ENV === 'development',

  // Opciones de como se manejará la sessión

  session: {
    strategy: 'jwt',
  },

  /**
   * jwt: {secret} no hace falta en las ultimas versiones. Toma por defecto ya la variable de entorno NEXTAUTH_JWT_SECRET para firmar el jwt
   *
   */

  // Indidcamos que tome la variable de entorno como semilla para firmar los tokens

  secret: process.env.NEXTAUTH_JWT_SECRET,

  // Funciones

  callbacks: {
    // Cuando queremos obtener el token se llama a esta función

    async jwt({ token, account, user }) {
      // Validamos que tengamos una cuenta

      if (account) {
        // Verificamos que tipo de autenticación se utilizó

        token.access_token = account?.access_token;

        switch (account.type) {
          case 'credentials':
            // Logeo mediante credenciales personalizadas

            token.user = user;
            break;

          case 'oauth':
            // Logeo mediante credenciales de una red externa. ej: Github, Google

            // TODO: consultar los datos del usuario en la BD

            break;

          default:
            break;
        }
      }

      return token;
    },

    // Cuando queremos obtener los datos de la sesion

    async session({ session, token }) {
      session.user = token?.user as IUserDB;

      // Con la interfaz arreglada agrregamos todo lo que nos falta

      const customSession: CustomSession = {
        ...session,
        access_token: token?.access_token as string,
      };

      return customSession;
    },

    // Controla cuando un usuario se intenta logear

    async signIn({ user, account, credentials }) {
      if (!account) {
        return '/home'; // redireccionamos
      }

      const emailSearch = credentials?.email as string;

      if (account.type === 'credentials') {
        // Conexión a BD y busqueda el usuario

        const userFound = await getUser(emailSearch);

        if (!userFound) return '/home';

        return true;
      } else {
        // Obtenemos los datos del user que retorna el provider

        const name = user?.name as string;
        const email = user?.email as string | undefined;
        const image = user?.image as string | undefined;
        const password = '@';

        let userData: IUserDB = { name, email, image, password };

        const {
          provider,
          providerAccountId,
          type: typeAccount,
          access_token,
          expires_at,
          id_token,
          refresh_token,
          scope,
          session_state,
          token_type,
        } = account;

        // Buscamos un user y actualizamos, si no existe lo creamos

        await updateUser(emailSearch, userData);

        // Insertamos la cuenta con la que ingreso/registro el usuario

        await updateAccount({
          provider,
          providerAccountId,
          typeAccount,
          access_token,
          expires_at,
          id_token,
          refresh_token,
          scope,
          session_state,
          token_type,
          userId: account?.userId as string,
        });

        return true;
      }
    },
  },
};

export default NextAuth(authOptions);
