import React, { FunctionComponent } from 'react';
import Image from 'next/image';

interface DebitCardProps {
   first_name: string;
   last_name: string;
   card_number: string;
}

const DebitCard: FunctionComponent<DebitCardProps> = ({
   first_name,
   last_name,
   card_number,
}) => {
   const formatCardNumber = (number: string): string => {
      return number.toString().replace(/\d{4}(?=.)/g, '$& ');
   };

   return (
      <div className='w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl mb-8'>
         <Image
            className='relative object-cover w-full h-full rounded-xl'
            alt='card-background'
            src='https://i.imgur.com/kGkSg1v.png'
            layout='fill'
         />

         <div className='w-full px-8 absolute top-8'>
            <div className='flex justify-between'>
               <div className=''>
                  <p className='font-light'>Name</p>
                  <p className='font-medium tracking-widest'>
                     {first_name} {last_name}
                  </p>
               </div>
               <img
                  className='w-14 h-14'
                  src='https://i.imgur.com/bbPHJVe.png'
               />
            </div>
            <div className='pt-1'>
               <p className='font-light'>Card Number</p>
               <p className='font-medium tracking-more-wider'>
                  {formatCardNumber(card_number)}
               </p>
            </div>
            <div className='pt-6 pr-6'>
               <div className='flex justify-between'>
                  <div className=''>
                     <p className='font-light text-xs'>Valid</p>
                     <p className='font-medium tracking-wider text-sm'>11/15</p>
                  </div>
                  <div className=''>
                     <p className='font-light text-xs text-xs'>Expiry</p>
                     <p className='font-medium tracking-wider text-sm'>03/25</p>
                  </div>

                  <div className=''>
                     <p className='font-light text-xs'>CVV</p>
                     <p className='font-bold tracking-more-wider text-sm'>
                        ···
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DebitCard;
