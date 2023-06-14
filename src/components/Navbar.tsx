import Image from 'next/image';

import { NavbarItem, MobileMenu, AccountMenu } from './';
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs';

import logo from '../../public/images/logo.png';
import profile_blue from '../../public/images/default-blue.png';
import { useCallback, useEffect, useState } from 'react';

const TOP_OFFSET = 66;

export const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // Evento que estará pendiente si la pos. actual en "Y" del scroll es mayor o menor que la constante definida

    const handleScroll = () =>
      window.screenY >= TOP_OFFSET
        ? setShowBackground(true)
        : setShowBackground(false);

    // Añadimos el evento al objeto de windows

    window.addEventListener('scroll', handleScroll);

    // Eliminamos el evento cuando el componente se desmonte

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleMobileAccount = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className='w-full fixed z-40 '>
      <div
        className={`px-4 md:px-16 py-6 flex items-center transition duration-500 ${
          showBackground ? ' bg-zinc-900 bg-opacity-90' : ''
        }`}
      >
        <Image className='h-4 lg:h-7 w-fit' src={logo} alt='logo' priority />

        {/* Desktop version */}

        <div className='lg:flex ml-8 gap-7 hidden'>
          <NavbarItem label='Inicio' />
          <NavbarItem label='Series' />
          <NavbarItem label='Películas' />
          <NavbarItem label='Popular' />
          <NavbarItem label='Mi Lista' />
          <NavbarItem label='Buscar por idioma' />
        </div>

        {/* Mobile version */}

        <div
          className='lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative'
          onClick={toggleMobileMenu}
        >
          <p className='text-white text-sm'>Bucar</p>

          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>

        <MobileMenu visible={showMobileMenu} />

        {/* Desktop version */}

        <div className='flex ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsSearch />
          </div>

          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsBell />
          </div>

          <div
            className='flex items-center gap-2 cursor-pointer relative'
            onClick={toggleMobileAccount}
          >
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <Image src={profile_blue} alt='profile image' />
            </div>

            {/* Efecto de rotar cuando se hace click sobre un elemento */}

            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visisble={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
