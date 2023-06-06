import { FC } from 'react';

interface Props {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

export const Input: FC<Props> = ({ id, onChange, value, type, label }) => {
    return (
        <div className='relative'>
            <input
                className='block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer'
                placeholder=' '
                id={id}
                type={type}
                value={value}
                onChange={onChange}
            />

            <label
                className='absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 capitalize'
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};

// transform: cuando se pone esta utilidad se habilita todas las funciones de transform para usar
// peer-placeholder-shown: cuando el placeholder el elemento con "peer" se muestra, se ejecuta un código
// peer-focus: cuando cuando se hace focus sobre el elemento "peer", se ejecuta un código
