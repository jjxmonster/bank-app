import { initializeApp, getApp } from 'firebase/app';

const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_APIKEY,
   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
   projectId: process.env.NEXT_PUBLIC_PID,
   storageBucket: process.env.NEXT_PUBLIC_SB,
   messagingSenderId: process.env.NEXT_PUBLIC_SID,
   appId: process.env.NEXT_PUBLIC_APPID,
};

const createFirebaseApp = (config = {}) => {
   try {
      return getApp();
   } catch (err) {
      return initializeApp(config);
   }
};

export const firebaseApp = createFirebaseApp(firebaseConfig);
