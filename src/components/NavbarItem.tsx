import { FC } from 'react';

interface Props {
  label: string;
}

export const NavbarItem: FC<Props> = ({ label }) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 transition'>
      {label}
    </div>
  );
};
