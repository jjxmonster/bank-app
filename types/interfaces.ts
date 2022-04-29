import { User as FirebaseUser } from '@firebase/auth';
import type { UserData } from './types';

export interface AuthenticationContextInterface {
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

export interface TransactionListItemProps {
   //    name: string;
   //    date: string;
   //    amount: number;
}
export interface AddFundsModalProps {
   setIsAddBalanceModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}
