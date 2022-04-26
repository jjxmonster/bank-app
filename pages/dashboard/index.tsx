import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthenticationContext } from '../../services/authentication.context';

const Dashboard: FunctionComponent = () => {
   const { onLogout, user } = useContext(AuthenticationContext);
   const { push } = useRouter();

   useEffect(() => {
      if (!user) push('/register');
   }, []);

   return (
      <div>
         Dashboard<button onClick={onLogout}>logout</button>
      </div>
   );
};

export default Dashboard;
