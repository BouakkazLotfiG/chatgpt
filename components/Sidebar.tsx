/* eslint-disable @next/next/no-img-element */
'use client';

import React, { use } from 'react';
import NewChat from './NewChat';
import { signOut, useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session.user?.email!, 'chats'))
  );

  return (
    <div className='flex flex-col h-screen p-2 '>
      <div className='flex-1 '>
        <div>
          {/* newchat */}
          <NewChat />

          <div className='hidden sm:inline '>
            <ModelSelection />
          </div>
          <div className='flex flex-col space-y-2 my-2'>
            {loading && (
              <div className='animate-pulse text-center text-white'>
                <p>Loading chats...</p>
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <div
          className='flex justify-between items-center border-gray-700 border chatRow  '
          onClick={() => signOut()}
        >
          <ArrowLeftOnRectangleIcon className='w-8 h-8 ' />
          <p className='font-semibold'>Logout</p>
          <img
            src={session.user?.image!}
            alt='avatar'
            className='h-10 w-10 rounded-full cursor-pointer mx-auto  hover:opacity-50 transition duration-150 ease-in-out'
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
