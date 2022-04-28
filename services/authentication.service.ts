import { createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { User as FirebaseUser } from '@firebase/auth';

import { randomNumber } from '../assets/accountNumberGenerator';

export const getUserData = async (user: FirebaseUser | null) => {
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

   return data;
};

export const onRegister = async (
   email: string,
   password: string,
   firstName: string,
   lastName: string,
   city: string,
   zip: number,
   auth: Auth
) => {
   return await createUserWithEmailAndPassword(auth, email, password).then(
      async res => {
         return await fetch('http://localhost:3000/api/users/addUser', {
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
               accountNumber: randomNumber(26),
               cardNumber: randomNumber(16),
            }),
         }).catch(err => err);
      }
   );
};
