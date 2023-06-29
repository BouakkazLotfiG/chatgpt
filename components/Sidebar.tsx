/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import NewChat from './NewChat';
import { signOut, useSession } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div className='flex flex-col h-screen p-2'>
      <div className='flex-1 '>
        <div>
          {/* newchat */}
          <NewChat />

          <div>{/* model selection  */}</div>

          {/* map through chat rows */}
        </div>
      </div>

      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt='avatar'
          className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 transition duration-150 ease-in-out'
        />
      )}
    </div>
  );
};

export default Sidebar;
