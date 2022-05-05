import React, { FunctionComponent, useState } from 'react';
import { Stripe } from '@stripe/stripe-js';

import { AddFundsModalProps } from '../../types/interfaces';
import { formatCurrency } from '../../assets/formatCurrency';
import getStripe from '../../assets/getStripe';

const AddFundsModal: FunctionComponent<AddFundsModalProps> = ({
   setIsAddBalanceModalActive,
}) => {
   const [choosenAmount, setChoosenAmount] = useState<number>(25);

   const handlePayment = async () => {
      const checkoutSession = await fetch('/api/balance/checkout_sessions');
      const { id: sessionId } = await checkoutSession.json();

      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
         sessionId,
      });
   };

   return (
      <div className='bg-gray-200 flex items-center justify-center soverflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full'>
         <div className='relative p-4 w-full max-w-2xl h-full md:h-auto'>
            <div className='relative bg-light-gray rounded-lg shadow dark:bg-gray-700'>
               <div className='flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600'>
                  <h3 className='text-xl font-semibold text-gray'>
                     Add funds to your balance
                  </h3>
                  <button
                     type='button'
                     onClick={() => setIsAddBalanceModalActive(false)}
                     className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                     data-modal-toggle='defaultModal'
                  >
                     <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                     >
                        <path
                           fillRule='evenodd'
                           d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                           clipRule='evenodd'
                        ></path>
                     </svg>
                  </button>
               </div>

               <div className='p-6 space-y-6'>
                  <label className='block uppercase text-white  tracking-wide text-gray text-xs font-bold mb-2'>
                     Amount
                  </label>
                  <div>
                     <button
                        onClick={() => setChoosenAmount(25)}
                        className={`mr-5 mb-5 text-white bg-gray-100 transition-colors hover:opacity-80 transform font-medium rounded-lg text-md px-5 py-2.5 text-center ${
                           choosenAmount === 25 && '!bg-purple-light'
                        }`}
                        type='button'
                     >
                        {formatCurrency(25)}
                     </button>
                     <button
                        onClick={() => setChoosenAmount(100)}
                        className={`mr-5 mb-5 text-white  bg-gray-100 transition-colors hover:opacity-80 transform font-medium rounded-lg text-md px-5 py-2.5 text-center ${
                           choosenAmount === 100 && '!bg-purple-light'
                        }`}
                        type='button'
                     >
                        {formatCurrency(100)}
                     </button>
                     <button
                        onClick={() => setChoosenAmount(500)}
                        className={`mr-5 mb-5 text-white bg-gray-100 transition-colors hover:opacity-80 transform font-medium rounded-lg text-md px-5 py-2.5 text-center ${
                           choosenAmount === 500 && '!bg-purple-light'
                        }`}
                        type='button'
                     >
                        {formatCurrency(500)}
                     </button>
                     <button
                        onClick={() => setChoosenAmount(1000)}
                        className={`mr-5 mb-5 text-white bg-gray-100 transition-colors hover:opacity-80 transform font-medium rounded-lg text-md px-5 py-2.5 text-center
                        ${choosenAmount === 1000 && '!bg-purple-light'}`}
                        type='button'
                     >
                        {formatCurrency(1000)}
                     </button>
                  </div>
               </div>

               <div className='flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600'>
                  <button
                     onClick={handlePayment}
                     className='w-full hover:opacity-80 bg-purple-light border-rounded text-white font-medium p-3'
                     type='submit'
                  >
                     Go to payment {formatCurrency(choosenAmount)}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddFundsModal;
