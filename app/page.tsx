import Image from 'next/image';
import {
  SunIcon,
  BoltIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const infoText = [
  {
    icon: <SunIcon className='h-8 w-8' />,
    title: 'Examples',
    text: [
      'Explain Something to me',
      'What is the diffrence between a dog and a cat?',
      'What is th color of the sun?',
    ],
  },
  {
    icon: <BoltIcon className='h-8 w-8' />,
    title: 'Capabilities',
    text: [
      'Remembers what user said earlier in the conversation',
      'Allows user to provide follow-up corrections',
      'Trained to decline inappropriate requests',
    ],
  },
  {
    icon: <ExclamationCircleIcon className='h-8 w-8' />,
    title: 'Limitations',
    text: [
      'May occasionally generate incorrect information',
      'May occasionally produce harmful instructions or biased content',
      'Limited knowledge of world and events after 2021',
    ],
  },
];

export default function Home() {
  return (
    <main className='flex flex-col items-center h-screen justify-center px-2  text-white'>
      <h1 className='text-5xl font-bold mb-20'>ChatGPT</h1>
      <div className='flex space-x-2 text-center'>
        {infoText.map((item, index) => (
          <div className='' key={index}>
            <div className='flex flex-col items-center justify-center mb-5'>
              {/* icons */}
              {item.icon}
              <h2>{item.title}</h2>
            </div>

            <div className='space-y-2'>
              {item.text.map((text, index) => (
                <p key={index} className='infoText'>
                  {item.title === 'Examples' ? (
                    <>&quot;{text}&quot;</>
                  ) : (
                    <>{text}</>
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
