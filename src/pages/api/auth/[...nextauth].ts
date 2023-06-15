import NextAuth, { NextAuthOptions, Session } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { compare } from 'bcrypt';
import { getUser, createAccount, createNewUserOauth } from '@/utils';
import { IAccount, IUser } from '@/interfaces';

export interface CustomSession extends Session {
  access_token: string;
  user: IUser;
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
          id: userFound._id.toString(),
          email: userFound.email,
          name: userFound?.name,
          image: userFound?.image,
          favoriteIds: userFound?.favoriteIds,
          accounts: userFound?.accounts,
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
   * jwt: {secret} no hace falta en las ultimas versiones. Toma por defecto ya la variable de entorno NEXTAUTH_SECRET para firmar el jwt
   */

  // Indidcamos que tome la variable de entorno como semilla para firmar los tokens

  secret: process.env.NEXTAUTH_SECRET,

  // Funciones

  callbacks: {
    // Controla cuando un usuario se intenta logear

    async signIn({ account, profile }) {
      if (!account) {
        return '/auth'; // redireccionamos
      }

      // Cuando es oauth, creamos el usuario si no existe

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

      // Insertamos la cuenta con la que ingreso/registro el usuario

      const newAccount = await createAccount({
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

      if (account.type === 'oauth') {
        try {
          await createNewUserOauth(
            profile?.name as string,
            profile?.email as string,
            '@',
            newAccount
          );
        } catch (error) {
          console.log(error);
        }
      }

      return true;
    },

    // Cuando queremos obtener el token se llama a esta función

    async jwt({ token, account, user, profile }) {
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

            // Obtenemos los datos del usuario para agregarlo al payload del token

            const userFound = await getUser(profile?.email as string);

            if (!userFound) {
              throw new Error('No existen datos del usuario');
            }

            const userToken = {
              id: userFound._id.toString(),
              email: userFound.email,
              name: userFound?.name,
              image: userFound?.image,
              favoriteIds: userFound?.favoriteIds,
            };

            token.user = userToken;

            break;

          default:
            break;
        }
      }

      return token;
    },

    // Cuando queremos obtener los datos de la sesion se llama a esta función

    async session({ session, token }) {
      // Con la interfaz arreglada agrregamos todo lo que nos falta

      const customSession: CustomSession = {
        ...session,
        user: token?.user as IUser,
        access_token: token?.access_token as string,
      };

      return customSession;
    },
  },
};

export default NextAuth(authOptions);

// ---- Notas

/**
1. `signIn`: Este callback se ejecuta después de que las credenciales del usuario se han validado en la función `authorize`. Aquí se pueden realizar acciones adicionales al momento de iniciar sesión, como almacenar información adicional del usuario o realizar llamadas a APIs externas. Si este callback devuelve `true`, se considera que la autenticación ha sido exitosa.

2. `redirect`: Este callback se ejecuta después de que el usuario ha iniciado sesión exitosamente y antes de redirigirlo a la página deseada. Aquí se puede personalizar la redirección del usuario, por ejemplo, redirigirlo a una página específica de tu aplicación. Si este callback devuelve una URL, se utilizará esa URL para redirigir al usuario.

3. `session`: Este callback se ejecuta después de que el usuario ha iniciado sesión y antes de crear o actualizar la sesión de NextAuth.js. Aquí se puede personalizar la información almacenada en la sesión del usuario, agregando datos adicionales al objeto `session`. Si este callback devuelve un objeto `session`, se utilizará ese objeto como la sesión del usuario.

4. `jwt`: Este callback se ejecuta después de que se ha creado o actualizado la sesión de NextAuth.js y antes de generar el token JWT (JSON Web Token) que se utilizará para autenticar al usuario en las solicitudes posteriores. Aquí se puede personalizar los datos que se incluirán en el token JWT, como agregar información adicional del usuario o establecer un tiempo de expiración personalizado. Si este callback devuelve un objeto `token`, se utilizará ese objeto como el token JWT del usuario.

*/
