import { createContext } from 'react';

import { AuthenticationContextInterface } from '../types/interfaces';

const defaultState = {
   isLoading: false,
   onLogin: () => {},
   onRegister: () => {},
   onLogout: () => {},
};

export const AuthenticationContext =
   createContext<AuthenticationContextInterface>(defaultState);
