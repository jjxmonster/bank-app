import React, {
   useState,
   createContext,
   FunctionComponent,
   ReactNode,
} from 'react';
import {
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signOut,
} from 'firebase/auth';

import { firebaseApp } from '../firebase/firebase';
import { randomAccountNumber } from '../assets/accountNumberGenerator';

interface AuthenticationContext {
   isAuthenticated: boolean;
   user?: object | null;
   isLoading: boolean;
   error?: string | null;
   onLogin: (email: string, password: string) => void;
   onRegister: (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      city: string,
      zip: number
   ) => void;
   onLogout: () => void;
}
interface AuthenticationContextProviderProps {
   children: ReactNode;
}

const defaultState = {
   isAuthenticated: false,
   isLoading: false,
   onLogin: () => {},
   onRegister: () => {},
   onLogout: () => {},
};

export const AuthenticationContext =
   createContext<AuthenticationContext>(defaultState);

export const AuthenticationContextProvider: FunctionComponent<
   AuthenticationContextProviderProps
> = props => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [user, setUser] = useState<object | null>(null);
   const [error, setError] = useState(null);

   const auth = getAuth(firebaseApp);

   onAuthStateChanged(auth, usr => {
      if (usr) {
         setUser(usr);
         setIsLoading(false);
      } else {
         setIsLoading(false);
      }
   });

   const onRegister = async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      city: string,
      zip: number
   ) => {
      setIsLoading(true);

      await createUserWithEmailAndPassword(auth, email, password).then(
         async res => {
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
            })
               .then(user => {
                  setUser(user);
                  setIsLoading(false);
               })
               .catch(e => {
                  setIsLoading(false);
                  setError(e.toString());
               });
         }
      );
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
         {props.children}
      </AuthenticationContext.Provider>
   );
};
