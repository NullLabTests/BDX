'use client';

import { useState } from 'react';
import { generateText } from 'ai';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await generateText({
      model: 'xai/grok-2', // Ensure this matches the correct model name
      prompt: input,
      apiKey: process.env.XAI_API_KEY
    });
    setResponse(result.text);
  };

  return (
    

      
Welcome to xAI Vercel App

      

        
{input}
 setInput(e.target.value)} 
          placeholder='Ask xAI something...'
        />
        Submit
      

      
{response}


    

  );
}
