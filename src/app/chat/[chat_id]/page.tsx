'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import { createDeepSeek } from '@ai-sdk/deepseek';

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? '',
  });
  return (
    <div className='flex flex-col h-screen justify-between items-center'>
      <div className='flex flex-col w-2/3 gap-8 overflow-y-auto justify-between flex-1'>
      <div className='h-4'></div>

        <div className='flex  flex-col gap-8 flex-1'>
          {messages?.map(message => (
            <div key={message.id} className={`rounded-lg flex flex-row ${message?.role === 'assistant' ? 'justify-start mr-18' : 'justify-end ml-10'}`}>
              <p className={`inline-block p-2 rounded-lg ${message?.role === 'assistant' ? 'bg-blue-300' : 'bg-slate-100 '}`}>
                {message.parts.map((part, index) =>
                  part.type === 'text' ? <span key={index}>{part.text}</span> : null,
                )}
              </p>

            </div>
          ))}
        </div>

      </div>


      <form
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
        />
        <button type="submit" disabled={status !== 'ready'}>
          Submit
        </button>
      </form>
    </div>
  );
}