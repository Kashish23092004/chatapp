import React, { useEffect, useRef } from 'react';
import useGetMessage from '../hooks/useGetMessage';
import { useAuth } from '../../context/AuthProvider';
import UserConversation from '../store/UserConversation';

const Messages = () => {
  const { loading, messages } = useGetMessage();
  const { authUser } = useAuth();
  const { selectedConversation } = UserConversation();
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="px-4 flex-1 overflow-auto no-scrollbar">
      {messages.map((msg) => {
        const isMyMessage = msg.senderId === authUser._id;
        const chatClass = isMyMessage ? 'chat-end' : 'chat-start';
        const bubbleColor = isMyMessage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';
        const avatar = isMyMessage 
          ? `https://ui-avatars.com/api/?name=${authUser.Fullname}&background=random`
          : `https://ui-avatars.com/api/?name=${selectedConversation?.Fullname}&background=random`;

        return (
          <div key={msg._id} className={`chat ${chatClass}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={avatar} />
              </div>
            </div>
            <div className={`chat-bubble ${bubbleColor} break-words max-w-xs`}>
              {msg.message}
            </div>
            <div className="chat-footer opacity-50 text-xs mt-1">
              {formatTime(msg.createdAt)}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;