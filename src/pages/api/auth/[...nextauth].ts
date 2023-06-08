import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import db, { clientPromise } from '../../../database';
import { User } from '@/models';
import { compare } from 'bcrypt';

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

                // TODO: Refactorizar esto para no tener toda la lógica aquí

                // Conexión a BD y busqueda el usuario

                await db.Connect();
                const userFound = await User.findOne({ email });
                await db.Disconnect();

                // Si no existe en BD, error

                if (!userFound || !userFound.password) {
                    throw new Error('El usuario no se encuentra registrado');
                }

                // Si la contraseña no coincide con la de la BD, error

                const isCorrectPassword = await compare(
                    password,
                    userFound.password
                );

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

    // Adapter para trabajar con MongoDB

    adapter: MongoDBAdapter(clientPromise),

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
        async signIn({ user, account }) {
            if (account && account.provider === 'github') {
                try {
                    await User.findOneAndUpdate(
                        { email: user.email },
                        { $set: { name: user.name, image: user.image } },
                        { upsert: true, new: true }
                    );
                } catch (error) {
                    console.error('Error saving user:', error);
                }
            }
            return true;
        },
    },
});
