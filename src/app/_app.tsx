"use client"

import { AuthProvider } from '@/shared/contexts/AuthContext';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { GlobalLoader } from '@/entities/global-loader';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="text-white text-5xl">loading</div>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;