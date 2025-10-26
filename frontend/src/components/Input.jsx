import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { FaLink } from "react-icons/fa6";
import useSendMessage from '../hooks/useSendMessage';

const Input = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    await sendMessage(message);
    setMessage(""); // Clear input after sending
  };

  return (
    <form onSubmit={handleSubmit} className='w-full px-4 py-3 bg-slate-200 rounded-2xl'>
      <div className='flex items-center gap-2'>
        <FaLink className='text-2xl' />
        <input
          type='text'
          placeholder='Type a message...'
          className='flex-1 input input-bordered bg-slate-200'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <button 
          type='submit' 
          className='btn btn-primary border-none'
          disabled={loading || !message.trim()}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <IoSend className='text-xl' />
          )}
        </button>
      </div>
    </form>
  );
};

export default Input;