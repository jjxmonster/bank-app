import React, { useContext, useEffect } from 'react';
import type { NextPage } from 'next';

import { AuthenticationContext } from '../../services/authentication.context';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Dashboard: NextPage = () => {
   const { user, userData } = useContext(AuthenticationContext);

   return (
      <div className='w-full px-12 py-16'>
         <div className='w-full h-16 flex items-center justify-end'>
            <AccountCircleIcon style={{ fontSize: '4rem', color: '#6C63FF' }} />
            <span className='text-white font-bold text-xl mx-2'>
               {userData?.first_name} {userData?.last_name}
            </span>
            <NotificationsIcon className='text-white cursor-pointer' />
         </div>
      </div>
   );
};

export default Dashboard;
