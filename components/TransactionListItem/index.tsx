import React, { FunctionComponent } from 'react';

import { formatCurrency } from '../../assets/formatCurrency';

const TransactionListItem: FunctionComponent = () => {
   return (
      <div className='w-full bg-gray p-5 flex justify-between rounded-xl mb-5'>
         <span className='text-white'>Apple</span>
         <span className='text-white'>20/05/2022</span>
         <span className='text-white'>-{formatCurrency(525)}</span>
      </div>
   );
};

export default TransactionListItem;
