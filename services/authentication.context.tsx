import React, { createContext } from 'react';

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

const defaultState = {
   isAuthenticated: false,
   isLoading: false,
   onLogin: () => {},
   onRegister: () => {},
   onLogout: () => {},
};

export const AuthenticationContext =
   createContext<AuthenticationContext>(defaultState);
