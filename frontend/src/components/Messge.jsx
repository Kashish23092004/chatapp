import React from 'react'
import { CgLogOut } from 'react-icons/cg'
import Avatar from './Avatar'
import USERGETALLUSERS from '../hooks/USERGETALLUSERS.js'
import { useAuth } from '../../context/AuthProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Message = () => {
  const [allUsers, loading] = USERGETALLUSERS(); 
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3100/api/test/logout', 
        {}, 
        { withCredentials: true }
      );
      
      console.log('✅ Logout successful:', response.data);
      
      // Clear localStorage
      localStorage.removeItem('lonelyu');
      
      // Clear auth state
      setAuthUser(null);
      
      // Redirect to login
      navigate('/login');
      
    } catch (error) {
      console.error('❌ Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Scrollable Users Section */}
      <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : allUsers && allUsers.length > 0 ? (
          allUsers.map((user) => (
            <Avatar 
              key={user._id} 
              user={user}
              onClick={() => console.log('Selected user:', user)}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center text-gray-400">
              <p className="text-lg poppins-medium">No other users yet</p>
              <p className="text-sm mt-2">Invite friends to start chatting!</p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Logout Button at Bottom */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="
            flex items-center justify-center gap-2
            w-full py-3 bg-blue-100
            text-slate-600 rounded-full
            hover:bg-blue-200 transition-all
            hover:shadow-md
          "
        >
          <CgLogOut className="text-2xl" />
          <span className="text-lg poppins-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Message