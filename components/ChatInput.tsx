'use client';

import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');

  //useSWR to fetch model
  const model = 'text-embedding-ada-002';

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt('');

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    //add to database
    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );

    //toster notif
    const notification = toast.loading('ChatGPT is thinking…');

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input, chatId, model, session }),
    }).then((res) => {
      toast.success('ChatGPT responded!', { id: notification });
    });
  };

  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
      <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
        <input
          className='bg-transparent flex-1  focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300'
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type='text'
          placeholder='Type your message here...'
        />
        <button
          disabled={!session || !prompt}
          type='submit'
          className='bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-slate-300'
        >
          <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
        </button>
      </form>

      <div>{/* model slection */}</div>
    </div>
  );
};

export default ChatInput;
