import React, { useEffect, useRef, useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Hello! I’m your Freshman AI Assistant. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Fetch AI reply using OpenRouter
  const fetchAIReply = async (userMessage) => {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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', // Replace with real key
          'HTTP-Referer': 'http://localhost:5173', // Or your real domain
          'X-Title': 'FreshmanAI Assistant',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // or another supported model
          messages: [
            { role: 'system', content: 'You are a helpful assistant for NTU freshmen.' },
            { role: 'user', content: userMessage },
          ],
        }),
      });

      const data = await res.json();
      console.log(data); // Debug: check structure

      const aiReply = data.choices?.[0]?.message?.content;
      return aiReply || "Sorry, I couldn't get a response.";
    } catch (error) {
      console.error('OpenRouter API error:', error);
      return 'Oops! There was an error contacting the AI.';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMessage = input.trim();
    setMessages((msgs) => [...msgs, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    const reply = await fetchAIReply(userMessage);
    setMessages((msgs) => [...msgs, { sender: 'ai', text: reply }]);
    setIsTyping(false);
  };

  const clearChat = () => {
    setMessages([{ sender: 'ai', text: 'Chat cleared. How can I assist you now?' }]);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[500px]">
      <h2 className="text-3xl font-semibold mb-4 select-none">🤖 Freshman ChatBot</h2>
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-inner border border-gray-300">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 max-w-[80%] p-3 rounded-lg break-words
              ${msg.sender === 'user' ? 'bg-blue-100 text-blue-800 self-end rounded-br-none' : 'bg-gray-100 text-gray-800 self-start rounded-bl-none'}
              shadow-sm`}
            style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <strong className="block mb-1">{msg.sender === 'user' ? 'You' : 'AI'}</strong>
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
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Ask me anything about NTU..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isTyping}
        />
        <button onClick={handleSend} disabled={isTyping || !input.trim()} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition">
          Send
        </button>
        <button onClick={clearChat} className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">
          Clear
        </button>
      </div>
    </div>
  );
}
