import type { NextApiRequest, NextApiResponse } from 'next';
import query from '@/lib/queryApi';
import admin from 'firebase-admin';
import { admindb } from '../../firebaseAdmin';

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    return res.status(400).json({ answer: 'Please provide a prompt' });
  }

  if (!chatId) {
    return res.status(400).json({ answer: 'Please provide a valid chat ID' });
  }

  const response = await query(prompt, chatId, model, session);
  console.log('🚀 ~ file: askQuestion.ts:25 ~ response:', response);

  const message: Message = {
    text: response || 'ChatGPT was unable to find an answer to your question.',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'chatgpt',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k',
    },
  };

  console.log(message);

  await admindb
    .collection('users')
    .doc(session?.user?.email!)
    .collection('chats')
    .doc(chatId as string)
    .collection('messages')
    .add(message);

  res.status(200).json({ answer: message.text });
}
