import React, { FunctionComponent, useContext, useEffect } from 'react';

import { AuthenticationContext } from '../../services/authentication.context';

const Dashboard: FunctionComponent = () => {
   const { onLogout, user } = useContext(AuthenticationContext);

   return (
      <div>
         Dashboard<button onClick={onLogout}>logout</button>
      </div>
   );
};

export default Dashboard;
