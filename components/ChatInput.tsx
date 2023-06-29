'use client';

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');

  return (
    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm'>
      <form className='p-5 space-x-5 flex'>
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
