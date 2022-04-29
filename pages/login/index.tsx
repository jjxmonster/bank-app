import React, { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import type { NextPage } from 'next';
import type { LoginFormInputs } from '../../types/types';

import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import SavingsIcon from '@mui/icons-material/Savings';

import { AuthenticationContext } from '../../services/authentication.context';

const RegisterPage: NextPage = () => {
   const { onLogin, user, error } = useContext(AuthenticationContext);
   const { push } = useRouter();

   const validationSchema = Yup.object().shape({
      password: Yup.string().required('Please enter your password'),
      email: Yup.string()
         .email('Must be a valid email')
         .max(255)
         .required('Please enter your email address'),
   });

   const formOptions = { resolver: yupResolver(validationSchema) };

   const {
      handleSubmit,
      setValue,
      register,
      formState: { errors },
   } = useForm<LoginFormInputs>(formOptions);

   const onSubmit: SubmitHandler<LoginFormInputs> = data => {
      const { email, password } = data;

      onLogin(email, password);
   };
   return (
      <>
         <Head>
            <title>Welcome back | Sign in | Bank</title>
         </Head>

         <div className='w-auto flex'>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className='relative flex flex-col justify-center mx-20 z-10 px-4 py-10 sm:rounded-3xl sm:p-20 '
            >
               <div className='absolute m-0 flex items-center left-14 top-14'>
                  <SavingsIcon
                     className='text-purple-light text-6xl'
                     style={{ fontSize: '3rem' }}
                  />
               </div>
               <h2 className='font-medium text-center text-purple-light text-4xl -translate-y-20'>
                  Sign In
               </h2>

               <div className='flex flex-wrap -mx-3 mb-6'>
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
               </div>

               <div className='mt-7 mb-6 md:mb-0 '>
                  <button
                     className='w-full hover:opacity-80 bg-purple-light border-rounded text-white font-medium p-3'
                     type='submit'
                  >
                     Sign In
                  </button>
                  {error && (
                     <p className='text-red-500 mt-3 text-md italic text-center'>
                        {error}
                     </p>
                  )}
               </div>
               <div className='mt-7 mb-6 md:mb-0 '>
                  <p className='text-center text-lg text-white'>
                     I{"'"}m a new client.{' '}
                     <span
                        onClick={() => push('/register')}
                        className='text-purple-light cursor-pointer'
                     >
                        Sign Up
                     </span>
                  </p>
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
      </>
   );
};

export default RegisterPage;
