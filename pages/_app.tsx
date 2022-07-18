import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

import { User as FirebaseUser } from '@firebase/auth';
import {
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
} from 'firebase/auth';
import { firebaseApp } from '../firebase/firebase';

import { AuthenticationContext } from '../services/authentication.context';
import { onRegister, getUserData } from '../services/authentication.service';

import '../styles/globals.css';

import LoadingIndicator from '../components/LoadingIndicator';
import AppLayout from '../components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [user, setUser] = useState<FirebaseUser | null>(null);
   // const [isUserAddedToDB, setIsUserAddedToDB] = useState<boolean | null>(null);
   const [userData, setUserData] = useState();
   const [error, setError] = useState(null);
   const [authorized, setAuthorized] = useState<boolean>(false);

   const { push, events, asPath, pathname } = useRouter();

   const auth = getAuth(firebaseApp);

   const registerUser = async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      city: string,
      zip: number
   ) => {
      setIsLoading(true);

      await onRegister(email, password, firstName, lastName, city, zip, auth)
         .then(() => {
            push('/dashboard');
         })
         .catch(e => {
            setIsLoading(false);
            setError(e.toString());
         });
   };

   const onLogin = async (email: string, password: string) => {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password).catch(err => {
         setIsLoading(false);
         setError(err.toString());
      });
   };

   const onLogout = () => {
      signOut(auth);

      push('/login');
   };

   const authUrlCheck = (url: string) => {
      const publicPaths = ['/login', '/register'];
      const path = url.split('?')[0];

      if (!user && !publicPaths.includes(path)) {
         setAuthorized(false);
         // push('/login');
      } else {
         setAuthorized(true);
      }
   };

   useEffect(() => {
      setError(null);
   }, [asPath]);

   useEffect(() => {
      if (user) {
         getUserData(user).then(data => {
            setUserData(data[0]);
         });
      }
   }, [user]);

   useEffect(() => {
      const hideContent = () => setAuthorized(false);

      authUrlCheck(asPath);

      const unsubscribe = onAuthStateChanged(auth, usr => {
         if (usr) {
            setUser(usr);
            setIsLoading(false);
            setAuthorized(true);

            if (pathname.includes('dashboard')) {
               return;
            } else {
               push('/dashboard');
            }
         } else {
            setUser(null);
            setIsLoading(false);
         }
      });

      events.on('routeChangeStart', hideContent);
      events.on('routeChangeComplete', authUrlCheck);

      return () => {
         events.off('routeChangeStart', hideContent);
         events.off('routeChangeComplete', authUrlCheck);
         unsubscribe();
      };
   }, [user]);
   return (
      <AuthenticationContext.Provider
         value={{
            user,
            userData,
            isLoading,
            error,
            onLogin,
            onRegister: registerUser,
            onLogout,
         }}
      >
         <div className='min-h-screen flex bg-gray max-h-screen'>
            {isLoading && <LoadingIndicator />}
            {user && pathname !== '/register' && pathname !== '/login' && (
               <AppLayout />
            )}
            {authorized && <Component {...pageProps} />}
         </div>
      </AuthenticationContext.Provider>
   );
};

export default App;
