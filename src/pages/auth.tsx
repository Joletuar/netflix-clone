import { useCallback, useState } from 'react';
import Image from 'next/image';

import logo from '../../public/images/logo.png';
import { Input } from '@/components';

const AuthHome = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) =>
            currentVariant === 'login' ? 'register' : 'login'
        );
    }, []);

    return (
        <div className="relative h-full w-full bg-[url('../../public/images/hero.jpg')] bg-cover bg-no-repeat bg-center bg-fixed">
            <div className='w-full h-full lg:bg-opacity-50 bg-black'>
                <nav className='px-12 py-5'>
                    <Image
                        className='h-12 w-fit'
                        src={logo}
                        alt='Logo'
                        priority
                    />
                </nav>

                <div className='flex justify-center'>
                    <div className='bg-black p-16 self-center mt-2 lg:w-2/5 lg:max-w-md w-full rounded-md'>
                        <h2 className='text-white text-4xl font-semibold mb-10'>
                            {variant === 'login'
                                ? 'Ingresar'
                                : 'Crear una cuenta'}
                        </h2>
                        <div className='flex flex-col gap-4'>
                            {variant === 'register' && (
                                <Input
                                    id={'username'}
                                    onChange={(e: any) =>
                                        setUsername(e.target.value)
                                    }
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
                                onChange={(e: any) =>
                                    setPassword(e.target.value)
                                }
                                value={password}
                                label={'password'}
                                type='password'
                            />
                        </div>

                        <button className='bg-red-600 py-3 text-white rounded-md block w-full mt-10 hover:bg-red-700 transition'>
                            {variant === 'login' ? 'Ingresar' : 'Crear cuenta'}
                        </button>

                        <p className='text-neutral-500 mt-12 text-end'>
                            {variant === 'login'
                                ? '¿No tienes cuenta?'
                                : '¿Ya tienes cuenta?'}

                            <span
                                onClick={toggleVariant}
                                className='text-white ml-1 hover:underline cursor-pointer'
                            >
                                {variant === 'login'
                                    ? 'Crear una cuenta'
                                    : 'Ingresar'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthHome;
