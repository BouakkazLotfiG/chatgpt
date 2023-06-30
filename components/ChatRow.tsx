import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';

type props = {
  id: string;
};

const ChatRow = ({ id }: props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/');
  };

  return (
    <Link
      className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}
      href={`/chat/${id}`}
    >
      <ChatBubbleLeftIcon className='h-5 w-5 mr-2 cursor-pointer' />
      <p className='flex-1 hidden md:inline-flex truncate'>
        {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
      </p>
      <TrashIcon
        onClick={removeChat}
        className='h-5 w-5 text-gray-700 hover:text-red-700 duration-150 ease-in-out cursor-pointer'
      />
    </Link>
  );
};

export default ChatRow;
