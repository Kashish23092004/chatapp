import React from 'react';
import Messages from './Messages';
import Input from './Input';
import Notext from './Notext';
import Welcome from './Welcome';
import UserConversation from '../store/UserConversation';
import useGetMessage from '../hooks/useGetMessage';

const Right = () => {
  const { selectedConversation } = UserConversation();
  const { messages } = useGetMessage();

  return (
    <div className="w-full h-screen flex flex-col">
      {selectedConversation ? (
        <>
          {/* Fixed Navbar with Selected User Info */}
          <div className="navbar bg-slate-500 shadow-sm">
            <div className='ml-[2%]'>
              <div className="avatar online">
                <div className="w-14 rounded-full">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${selectedConversation.Fullname}&background=random`}
                    alt={selectedConversation.Fullname}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col ml-[1%]'>
              <a className='poppins-regular text-white'>{selectedConversation.Fullname}</a>
              <a className='poppins-medium text-gray-200 text-sm'>online</a>
            </div>
          </div>
          
          {/* Scrollable Content Area */}
          <div className="flex-1 bg-slate-600 overflow-y-auto no-scrollbar">
            {messages && messages.length > 0 ? (
              <Messages />
            ) : (
              <Notext />
            )}
          </div>
          
          {/* Input area */}
          <div className="p-4 bg-slate-600">
            <Input />
          </div>
        </>
      ) : (
        // Show Welcome screen when no conversation is selected
        <div className="flex-1 bg-slate-600 overflow-y-auto no-scrollbar">
          <Welcome />
        </div>
      )}
    </div>
  );
};

export default Right;