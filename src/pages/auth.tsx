import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logo from '../../public/images/logo.png';
import { Input } from '@/components';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const AuthHome = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const router = useRouter();

  // Función que permite cambiar la variante
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  // Función para realizar el login de un usario ya registrado
  const handleLogin = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/', // ruta a donde se redigirá si se logea correctamente, por defecto es la misma página
        redirect: false, // al estar en false nextauth no redireccionará automaticamente
      });

      // Redirecionamos manualmente nosotros

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  // Función para registrar un nuevo usuario
  const handleRegister = useCallback(async () => {
    try {
      await axios.post('/api/user/register', {
        email,
        password,
        username,
      });

      // Si el registro sale exitóso, logueamos

      await handleLogin();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, username, handleLogin]);

  return (
    // Main container with de image background

    <div className="relative h-full w-full bg-[url('../../public/images/hero.jpg')] bg-cover bg-no-repeat bg-center bg-fixed">
      <div className='w-full h-full lg:bg-opacity-50 bg-black'>
        <nav className='px-12 py-5'>
          <Image className='h-12 w-fit' src={logo} alt='Logo' priority />
        </nav>

        {/* Login and Register */}

        <div className='flex justify-center'>
          <div className='bg-black p-16 self-center mt-2 lg:w-2/5 lg:max-w-md w-full rounded-md'>
            <h2 className='text-white text-4xl font-semibold mb-10'>
              {variant === 'login' ? 'Ingresar' : 'Crear una cuenta'}
            </h2>

            {/* Container of inputs */}

            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  id={'username'}
                  onChange={(e: any) => setUsername(e.target.value)}
                  value={username}
                  label={'username'}
                  type='text'
                />
              )}

              <Input
                id={'email'}
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
                label={'email'}
                type='email'
              />

              <Input
                id={'password'}
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                label={'password'}
                type='password'
              />
            </div>

            {/* Register and Login button */}

            <button
              className='bg-red-600 py-3 text-white rounded-md block w-full mt-10 hover:bg-red-700 transition'
              onClick={variant === 'login' ? handleLogin : handleRegister}
            >
              {variant === 'login' ? 'Ingresar' : 'Crear cuenta'}
            </button>

            {/* Providers icons */}

            <div className='flex items-center justify-center gap-4 mt-8'>
              <div
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/',
                  })
                }
              >
                <FcGoogle size={30} />
              </div>

              <div
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
                onClick={() =>
                  signIn('github', {
                    callbackUrl: '/',
                  })
                }
              >
                <FaGithub size={30} />
              </div>
            </div>

            {/* Helper text */}

            <p className='text-neutral-500 mt-8 text-end'>
              {variant === 'login'
                ? '¿No tienes cuenta?'
                : '¿Ya tienes cuenta?'}

              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Crear una cuenta' : 'Ingresar'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHome;
