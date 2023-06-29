import Chat from '@/components/Chat';
import ChatInput from '@/components/ChatInput';
import { type } from 'os';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      {/* chat  */}
      <Chat chatId={id} />

      {/* chatinput  */}
      <ChatInput chatId={id} />
    </div>
  );
};

export default ChatPage;
