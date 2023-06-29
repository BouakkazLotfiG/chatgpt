/* eslint-disable @next/next/no-img-element */
'use client';

import React, { use } from 'react';
import NewChat from './NewChat';
import { signOut, useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import ChatRow from './ChatRow';

const Sidebar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, 'users', session.user?.email!, 'chats'))
  );

  return (
    <div className='flex flex-col h-screen p-2'>
      <div className='flex-1 '>
        <div>
          {/* newchat */}
          <NewChat />

          <div>{/* model selection  */}</div>

          {/* map through chat rows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
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
