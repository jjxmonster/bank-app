import React, { FunctionComponent, useContext } from 'react';
import { useRouter } from 'next/router';

import { AuthenticationContext } from '../../services/authentication.context';

import SavingsIcon from '@mui/icons-material/Savings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Sidebar: FunctionComponent = () => {
   const { onLogout } = useContext(AuthenticationContext);
   const { pathname, push } = useRouter();
   return (
      <div className='h-screen relative w-96	flex flex-col px-12 py-16 after:w-full after:h-5/6 after:border-gray-100 after:border-r after:absolute after:m-auto after:inset-0 '>
         <div className='w-full h-16 flex items-center justify-center'>
            <SavingsIcon
               className='text-purple-light text-6xl'
               style={{ fontSize: '3rem' }}
            />
         </div>
         <div className='w-full mt-12 z-30'>
            <div
               onClick={() => push('/dashboard')}
               className={`w-full flex pl-7 items-center text-lg text-light-gray cursor-pointer hover:bg-gray-100 transition-all ease-500 hover:text-white rounded-xl mb-3 py-4 ${
                  pathname === '/dashboard' && '!text-white bg-gray-100'
               }`}
            >
               <DashboardIcon style={{ fontSize: '1.8rem' }} />{' '}
               <span className='ml-3'>Dashboard</span>
            </div>
            <div
               onClick={() => push('/transfer')}
               className={`w-full flex pl-7 items-center text-lg text-light-gray cursor-pointer hover:bg-gray-100 transition-all ease-500 hover:text-white rounded-xl mb-3 py-4 ${
                  pathname === '/transfer' && '!text-white bg-gray-100'
               }`}
            >
               <SendIcon style={{ fontSize: '1.8rem' }} />{' '}
               <span className='ml-3'>Transfer</span>
            </div>
            <div className='w-full flex pl-7 items-center text-lg text-light-gray cursor-pointer hover:bg-gray-100 transition-all ease-500 hover:text-white rounded-xl mb-16 py-4'>
               <FormatListBulletedIcon style={{ fontSize: '1.8rem' }} />{' '}
               <span className='ml-3'>Transactions</span>
            </div>
            <div
               onClick={onLogout}
               className='w-full flex pl-7 items-center text-lg text-light-gray cursor-pointer hover:bg-gray-100 transition-all ease-500 hover:text-white rounded-xl mb-3 py-4'
            >
               <LogoutIcon style={{ fontSize: '1.8rem' }} />{' '}
               <span className='ml-3'>Sign Out</span>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;
