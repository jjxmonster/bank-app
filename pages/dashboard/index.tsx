import React, { useContext, useEffect } from 'react';
import type { NextPage } from 'next';

import { AuthenticationContext } from '../../services/authentication.context';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import DebitCard from '../../components/DepitCard';

import { formatCurrency } from '../../assets/formatCurrency';

const Dashboard: NextPage = () => {
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
         <div className='flex'>
            <div className='mw-1/2'>
               <h2 className='text-white font-bold text-2xl w-full mb-10'>
                  Cards
               </h2>
               {userData && (
                  <DebitCard
                     first_name={userData.first_name}
                     last_name={userData.last_name}
                     card_number={userData.card_number}
                  />
               )}
               <div className='w-full flex  justify-between items-center'>
                  <div>
                     <h3 className='text-light-gray font-medium text-lg w-full'>
                        Balance
                     </h3>
                     <span className='text-white font-md text-4xl w-full'>
                        {userData && formatCurrency(userData.balance)}
                     </span>
                  </div>
                  <AddCircleIcon
                     className='text-purple-light cursor-pointer'
                     style={{ fontSize: '3rem' }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
