import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import SavingsIcon from '@mui/icons-material/Savings';

import { AuthenticationContext } from '../../services/authentication.context';
import Head from 'next/head';
import LoadingIndicator from '../../components/LoadingIndicator';

type Inputs = {
   firstName: string;
   lastName: string;
   password: string;
   email: string;
   city: string;
   zip: number;
};

const RegisterPage: NextPage = () => {
   const { onRegister, isLoading, user, error } = useContext(
      AuthenticationContext
   );

   const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      password: Yup.string().matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
         'Must Contain 8 Characters and one uppercase'
      ),
      email: Yup.string()
         .email('Must be a valid email')
         .max(255)
         .required('Email is required'),
      city: Yup.string()
         .required('City is required')
         .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
      zip: Yup.string()
         .required('Zip code is required')
         .min(5, 'Wrong zip code'),
   });

   const formOptions = { resolver: yupResolver(validationSchema) };

   const {
      handleSubmit,
      setValue,
      register,
      formState: { errors },
   } = useForm<Inputs>(formOptions);

   const onSubmit: SubmitHandler<Inputs> = data => {
      const { email, password, firstName, lastName, city, zip } = data;

      onRegister(email, password, firstName, lastName, city, zip);
   };

   return (
      <>
         <Head>
            <title>Create you account - JJ Bank</title>
         </Head>
         <div className='min-h-screen flex bg-gray'>
            {isLoading && <LoadingIndicator />}
            <div className='w-auto flex'>
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='relative flex flex-col justify-center mx-20 z-10 px-4 py-10 sm:rounded-3xl sm:p-20 '
               >
                  <div className='absolute m-0 flexleft-14 top-14'>
                     <SavingsIcon className='text-purple-light text-6xl' />
                  </div>
                  <h2 className='font-medium text-center text-purple-light text-4xl -translate-y-20'>
                     REGISTER
                  </h2>
                  <div className='flex z-100 flex-wrap -mx-3 mb-6'>
                     <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                        <label
                           className='block uppercase  text-white tracking-wide text-gray-700 text-xs font-bold mb-2'
                           htmlFor='grid-first-name'
                        >
                           First Name
                        </label>
                        <input
                           {...register('firstName')}
                           onChange={e => setValue('firstName', e.target.value)}
                           className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                           id='grid-first-name'
                           type='text'
                           placeholder='James'
                        />
                        <p className='text-red-500 text-xs italic'>
                           <ErrorMessage errors={errors} name='name' />
                        </p>
                     </div>
                     <div className='w-full md:w-1/2 px-3'>
                        <label
                           className='block uppercase text-white tracking-wide text-gray-700 text-xs font-bold mb-2'
                           htmlFor='grid-last-name'
                        >
                           Last Name
                        </label>
                        <input
                           {...register('lastName')}
                           onChange={e => setValue('lastName', e.target.value)}
                           autoComplete='off'
                           className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                           id='grid-last-name'
                           type='text'
                           placeholder='Bond'
                        />
                        <p className='text-red-500 text-xs italic'>
                           <ErrorMessage errors={errors} name='surname' />
                        </p>
                     </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-6'>
                     <div className='w-full md:w-1/2 px-3'>
                        <label
                           className='block uppercase text-white  tracking-wide text-gray-700 text-xs font-bold mb-2'
                           htmlFor='grid-password'
                        >
                           Password
                        </label>
                        <input
                           {...register('password')}
                           onChange={e => setValue('password', e.target.value)}
                           className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                           id='grid-password'
                           type='password'
                           placeholder='******************'
                        />
                        <p className='text-red-500 text-xs italic'>
                           <ErrorMessage errors={errors} name='password' />
                        </p>
                     </div>
                     <div className='w-full md:w-1/2 px-3'>
                        <label
                           className='block uppercase text-white  tracking-wide text-gray-700 text-xs font-bold mb-2'
                           htmlFor='email'
                        >
                           Email Address
                        </label>
                        <input
                           {...register('email')}
                           onChange={e => setValue('email', e.target.value)}
                           className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                           id='email'
                           type='email'
                           placeholder='james@example.com'
                        />
                        <p className='text-red-500 text-xs italic'>
                           <ErrorMessage errors={errors} name='email' />
                        </p>
                     </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-2'>
                     <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label
                           className='block uppercase text-white  tracking-wide text-gray-700 text-xs font-bold mb-2'
                           htmlFor='grid-city'
                        >
                           City
                        </label>
                        <input
                           {...register('city')}
                           onChange={e => setValue('city', e.target.value)}
                           className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                           id='grid-city'
                           type='text'
                           placeholder='Warsaw'
                        />
                        <p className='text-red-500 text-xs italic'>
                           <ErrorMessage errors={errors} name='city' />
                        </p>
                     </div>

                     <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label
                           className='block uppercase text-white  tracking-wide text-gray-700 text-xs font-bold mb-2'
                           htmlFor='grid-zip'
                        >
                           Zip
                        </label>
                        <input
                           {...register('zip')}
                           onChange={e =>
                              setValue('zip', Number(e.target.value))
                           }
                           className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                           id='grid-zip'
                           type='text'
                           placeholder='20500'
                        />
                        <p className='text-red-500 text-xs italic'>
                           <ErrorMessage errors={errors} name='zip' />
                        </p>
                     </div>
                  </div>
                  <div className='mt-7 mb-6 md:mb-0 '>
                     <button
                        className='w-full hover:opacity-80 bg-purple-light border-rounded text-white font-medium p-3'
                        type='submit'
                     >
                        SUBMIT
                     </button>
                     {error && (
                        <p className='text-red-500 mt-3 text-md italic'>
                           {error}
                        </p>
                     )}
                  </div>
               </form>
            </div>
            <div className='flex-1 relative'>
               <Image
                  src='/img/online-payments.svg'
                  layout='fill'
                  objectFit='scale-down'
                  alt='payments-illustration'
               />
            </div>
         </div>
      </>
   );
};

export default RegisterPage;
