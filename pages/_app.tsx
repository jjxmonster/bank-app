import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { AuthenticationContextProvider } from '../services/authentication.context';

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <AuthenticationContextProvider>
         <Component {...pageProps} />;
      </AuthenticationContextProvider>
   );
}

export default MyApp;
