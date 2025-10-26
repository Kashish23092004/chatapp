import React from 'react';
import UserConversation from '../store/UserConversation';

const Avatar = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = UserConversation();
  const isSelected = selectedConversation?._id === user._id;

  const handleClick = () => {
    setSelectedConversation(user);
    console.log('Selected user:', user);
  };

  return (
    <div>
      <div 
        className={`flex hover:bg-blue-200 mt-[5%] rounded-2xl m-4 p-4 cursor-pointer transition-all ${
          isSelected ? 'bg-blue-300' : ''
        }`}
        onClick={handleClick}
      >
        <div className="ml-5 avatar online">
          <div className="w-14 rounded-full">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.Fullname || 'User'}&background=random`}
              alt={user?.Fullname}
            />
          </div>
        </div>
        <div className='ml-[4%]'>
          <h1 className='mt-2.5 text-slate-700 oswald'>{user?.Fullname || 'Unknown'}</h1>
          <h1 className='text-slate-600 poppins-medium text-sm'>{user?.Email || 'No email'}</h1>
        </div>
      </div>
    </div>
  );
};

export default Avatar;