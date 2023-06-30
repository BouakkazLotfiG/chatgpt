import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats'),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };
  return (
    <div
      onClick={createNewChat}
      className='border-gray-700 border chatRow  min-w-[50px]'
    >
      <PlusIcon className='h-4 w-4' />
      <p>New Chat</p>
    </div>
  );
};

export default NewChat;
