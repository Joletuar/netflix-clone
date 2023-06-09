import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { compare } from 'bcrypt';
import { getUser, updateAccount, updateUser } from '@/utils';
import { IUserDB } from '@/interfaces';

export default NextAuth({
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

        // email
        email: {
          label: 'Email',
          type: 'text',
        },

        // password
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

        switch (account.provider) {
          case 'github':
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

          case 'google':
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

          default:
            return '/home';
        }
      }
    },
  },
});
