import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const Welcome = () => {
  const { authUser } = useAuth();

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 oswald">
          Welcome back, {authUser?.Fullname}! 👋
        </h1>
        <p className="poppins-medium text-xl text-gray-300 bg-slate-700 px-[5%] py-[5%] rounded-lg shadow-md">
          Select a conversation to start chatting
        </p>
      </div>
    </div>
  );
};

export default Welcome;