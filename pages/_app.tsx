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

import { randomAccountNumber } from '../assets/accountNumberGenerator';
import { AuthenticationContext } from '../services/authentication.context';

import '../styles/globals.css';

import LoadingIndicator from '../components/LoadingIndicator';
import Sidebar from '../components/Sidebar';

const App = ({ Component, pageProps }: AppProps) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [user, setUser] = useState<FirebaseUser | null>(null);
   const [userData, setUserData] = useState();
   const [error, setError] = useState(null);
   const [authorized, setAuthorized] = useState<boolean>(false);

   const { push, events, asPath } = useRouter();

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

      await createUserWithEmailAndPassword(auth, email, password)
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
            }).then(() => {
               setUser(res.user);
               setIsLoading(false);

               push('/dashboard');
            });
         })
         .catch(e => {
            setIsLoading(false);
            setError(e.toString());
         });
   };

   const onLogin = async (email: string, password: string) => {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
   };

   const onLogout = () => {
      setUser(null);
      signOut(auth);

      push('/login');
   };

   const authUrlCheck = (url: string) => {
      const publicPaths = ['/login', '/register'];
      const path = url.split('?')[0];

      if (!user && !publicPaths.includes(path)) {
         setAuthorized(false);
         push('/login');
      } else {
         setAuthorized(true);
      }
   };

   useEffect(() => {
      const getUserData = async () => {
         const response = await fetch(
            `http://localhost:3000/api/users/getUser?id=${user?.uid}`,
            {
               method: 'GET',
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
            }
         );
         const data = await response.json();

         setUserData(data[0]);
      };
      if (user) {
         getUserData();
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

            push('/dashboard');
         } else {
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
            onRegister,
            onLogout,
         }}
      >
         <div className='min-h-screen flex bg-gray'>
            {isLoading && <LoadingIndicator />}
            {user !== null && <Sidebar />}
            {authorized && <Component {...pageProps} />}
         </div>
      </AuthenticationContext.Provider>
   );
};

export default App;
