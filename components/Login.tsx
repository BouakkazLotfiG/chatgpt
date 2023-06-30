'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const Login = () => {
  return (
    <div className='bg-[#e9fffa] flex flex-col h-screen items-center justify-between '>
      <div className='bg-[#11A37F] w-[90%] md:w-[35%] shadow-lg rounded-lg flex flex-col items-center mt-20'>
        <Image
          src='https://links.papareact.com/2i6'
          width={150}
          height={150}
          alt='logo'
        />
        <h1 className='text-white text-center text-3xl font-semibold mb-5'>
          Welcome to ChatGPT <br /> on steroids
        </h1>
        <h3 className='text-white mb-5 '>Sign in using one of the following</h3>
        <div className='flex flex-col gap-2 '>
          <button
            onClick={() => signIn('google')}
            className='flex font-poppins justify-center items-center gap-6 px-5 py-3 text-sm hover:bg-gray-700/70 cursor-pointer rounded-lg text-gray-700 
          transition-all duration-200 ease-out border border-gray-300 hover:border-transparent bg-gray-100 hover:text-white'
          >
            Sign In with Google
            <Image src='/google.png' width={20} height={20} alt='google' />
          </button>

          <div className='flex items-center justify-center my-2'>
            <div className='border-t border-gray-300 flex-grow mr-3'></div>
            <span className='text-gray-300'>or</span>
            <div className='border-t border-gray-300 flex-grow ml-3'></div>
          </div>

          <button
            onClick={() => signIn('google')}
            className='flex justify-center items-center gap-6 px-5 py-3 text-sm hover:bg-gray-700/70 cursor-pointer rounded-lg text-gray-700 
          transition-all duration-200 ease-out border border-gray-300 hover:border-transparent bg-gray-100 hover:text-white mb-8'
          >
            Sign In with Github
            <Image src='/github.png' width={20} height={20} alt='google' />
          </button>
        </div>
      </div>
      <div className=' text-gray-500 text-xs mb-2 flex gap-1 items-center'>
        <p> Created with love by Lotfi</p>
        <Image src='/heart.png' width={20} height={20} alt='logo' />
      </div>
    </div>
  );
};

export default Login;
