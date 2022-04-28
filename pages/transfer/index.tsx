import React, { useContext } from 'react';
import type { NextPage } from 'next';

import { AuthenticationContext } from '../../services/authentication.context';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Transfer: NextPage = () => {
   const { userData } = useContext(AuthenticationContext);

   return (
      <div className='w-page-width px-12 py-16'>
         <header className='w-full h-16 flex items-center justify-end'>
            <AccountCircleIcon style={{ fontSize: '4rem', color: '#6C63FF' }} />
            <span className='text-white font-bold text-xl mx-2'>
               {userData?.first_name} {userData?.last_name}
            </span>
            <NotificationsIcon className='text-white cursor-pointer' />
         </header>
      </div>
   );
};

export default Transfer;
