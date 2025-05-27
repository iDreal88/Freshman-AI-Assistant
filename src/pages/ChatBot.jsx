// pages/ChatBot.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Hello! I'm your Freshman AI Assistant. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessageToAI = async (userInput) => {
    if (!HUGGINGFACE_API_KEY) {
      console.error('Hugging Face API key is missing');
      setMessages((prev) => [...prev, { 
        sender: 'ai', 
        text: 'Configuration error - API key not found' 
      }]);
      setIsTyping(false);
      return;
    }

    try {
      // Using a more reliable model endpoint
      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          },
          body: JSON.stringify({
            inputs: `<s>[INST] ${userInput} [/INST]`,
            parameters: {
              max_new_tokens: 250,
              return_full_text: false
            }
          }),
        }
      );

      // Handle model loading case
      if (response.status === 503) {
        const waitTime = response.headers.get('estimated-seconds') || 30;
        setMessages((prev) => [...prev, { 
          sender: 'ai', 
          text: `Model is loading, please wait about ${waitTime} seconds and try again` 
        }]);
        setIsTyping(false);
        return;
      }

      // Handle other errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different possible response formats
      const aiReply = data[0]?.generated_text || 
                      "Sorry, I couldn't process that. Please try again.";
      
      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (err) {
      console.error('API Error:', err);
      setMessages((prev) => [...prev, { 
        sender: 'ai', 
        text: err.message.includes('404') 
          ? 'The AI model is currently unavailable. Please try another model.' 
          : `Error: ${err.message || 'Failed to get response'}`
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMessage = input.trim().slice(0, 500); // Limit input length
    setMessages((msgs) => [...msgs, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);
    sendMessageToAI(userMessage);
  };

  const clearChat = () => {
    setMessages([{ sender: 'ai', text: 'Chat cleared. How can I assist you now?' }]);
    setInput('');
  };

  // Alternative model suggestion if primary fails
  const tryAlternativeModel = () => {
    setMessages((prev) => [...prev, { 
      sender: 'ai', 
      text: 'Trying an alternative model...' 
    }]);
    setIsTyping(true);
    // You would implement similar logic as sendMessageToAI but with a different model
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[500px]">
      <h2 className="text-3xl font-semibold mb-4 select-none">🤖 Freshman ChatBot</h2>
      <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-inner border border-gray-300 dark:border-zinc-600" role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 max-w-[80%] p-3 rounded-lg break-words
              ${msg.sender === 'user' ? 'bg-blue-100 text-blue-800 self-end rounded-br-none dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 self-start rounded-bl-none dark:bg-zinc-700 dark:text-gray-100'}
              shadow-sm`}
            style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <strong className="block mb-1 select-none">{msg.sender === 'user' ? 'You' : 'AI'}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
        {isTyping && <div className="text-gray-500 italic text-sm">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          aria-label="Chat input"
          className="flex-1 border border-gray-300 dark:border-zinc-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isTyping}
          autoComplete="off"
        />
        <button 
          onClick={handleSend} 
          disabled={isTyping || !input.trim()} 
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
        <button 
          onClick={clearChat} 
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition" 
          aria-label="Clear chat"
        >
          Clear
        </button>
      </div>

      {/* Error recovery suggestion */}
      {messages.some(m => m.text.includes('unavailable')) && (
        <div className="mt-2 text-center">
          <button 
            onClick={tryAlternativeModel}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Try alternative model
          </button>
        </div>
      )}
    </div>
  );
}