import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import ClientProvider from '@/components/ClientProvider';
import localFont from '@next/font/local';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata = {
  title: 'ChatGPT',
  description: 'ChatGPT is a chatbot that uses GPT-3 to chat with you.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('next');
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body className={poppins.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className='flex '>
              <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
                <Sidebar />
              </div>

              <ClientProvider />
              <div className='bg-[#343541] flex-1'>{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
