import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { ModalProvider } from '@/context';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </SessionProvider>
  );
}
