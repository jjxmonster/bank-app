import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

import {
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signOut,
} from 'firebase/auth';
import { firebaseApp } from '../firebase/firebase';

import { randomAccountNumber } from '../assets/accountNumberGenerator';
import { AuthenticationContext } from '../services/authentication.context';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [user, setUser] = useState<object | null>(null);
   const [error, setError] = useState(null);
   const [authorized, setAuthorized] = useState<boolean>(false);

   const router = useRouter();

   const auth = getAuth(firebaseApp);

   const onRegister = async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      city: string,
      zip: number
   ) => {
      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
         .then(async res => {
            await fetch('http://localhost:3000/api/users/addUser', {
               method: 'POST',
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  firstName,
                  lastName,
                  city,
                  zip,
                  authId: res.user.uid,
                  accountNumber: randomAccountNumber(),
               }),
            }).then(user => {
               setUser(user);
               setIsLoading(false);
            });
         })
         .catch(e => {
            setIsLoading(false);
            setError(e.toString());
         });
   };

   const onLogin = (email: string, password: string) => {
      setIsLoading(true);
      // loginRequest(email, password, auth)
      //    .then(user => {
      //       setUser(user);
      //       setIsLoading(false);
      //    })
      //    .catch(e => {
      //       setIsLoading(false);
      //       setError(e.toString());
      //    });
   };

   const onLogout = () => {
      setUser(null);
      signOut(auth);
   };

   const authUrlCheck = (url: string) => {
      setUser(user);
      const publicPaths = ['/login', '/register'];
      const path = url.split('?')[0];
      if (!user && !publicPaths.includes(path)) {
         setAuthorized(false);
         router.push('/register');
      } else {
         setAuthorized(true);
      }
   };

   useEffect(() => {
      onAuthStateChanged(auth, usr => {
         if (usr) {
            setUser(usr);
            setIsLoading(false);
         } else {
            setIsLoading(false);
         }
      });

      authUrlCheck(router.asPath);

      const hideContent = () => setAuthorized(false);

      router.events.on('routeChangeStart', hideContent);
      router.events.on('routeChangeComplete', authUrlCheck);

      return () => {
         router.events.off('routeChangeStart', hideContent);
         router.events.off('routeChangeStart', authUrlCheck);
      };
   }, []);
   return (
      <AuthenticationContext.Provider
         value={{
            isAuthenticated: !!user,
            user,
            isLoading,
            error,
            onLogin,
            onRegister,
            onLogout,
         }}
      >
         {authorized && <Component {...pageProps} />}
      </AuthenticationContext.Provider>
   );
};

export default App;
