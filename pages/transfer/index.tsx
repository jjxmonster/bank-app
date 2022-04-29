import React, { useContext } from 'react';
import type { NextPage } from 'next';

import { AuthenticationContext } from '../../services/authentication.context';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Transfer: NextPage = () => {
   const { userData } = useContext(AuthenticationContext);

   return <div className='w-page-width px-12 py-16'></div>;
};

export default Transfer;
