'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api_key = process.env.XAI_API_KEY;
      if (!api_key) {
        throw new Error('API Key is not set in the environment variables.');
      }

      const apiResponse = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + api_key
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system', 
              content: 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: input
            }
          ],
          model: 'grok-2-latest'
        })
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error('HTTP error! status: ' + apiResponse.status + ' - ' + errorText);
      }

      const data = await apiResponse.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Detailed Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setResponse('An error occurred while generating the response: ' + errorMessage);
    }
  };
  return (
    <div>
      <h1>Welcome to xAI Vercel App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          value={input} 
          onChange={handleInputChange} 
          placeholder='Ask xAI something...'
        />
        <button type='submit'>Submit</button>
      </form>
      <p>Response: {response}</p>
    </div>
  );
}
