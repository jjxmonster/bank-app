import { createContext } from 'react';
import { User as FirebaseUser } from '@firebase/auth';

type UserData = {
   acc_number: string;
   balance: number;
   auth_id: string;
   city: string;
   first_name: string;
   last_name: string;
   zip: string;
   card_number: string;
};

interface AuthenticationContext {
   user?: FirebaseUser | null;
   userData?: UserData | null;
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
   isLoading: false,
   onLogin: () => {},
   onRegister: () => {},
   onLogout: () => {},
};

export const AuthenticationContext =
   createContext<AuthenticationContext>(defaultState);
