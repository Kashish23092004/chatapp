import React from 'react'
import { IoSend } from 'react-icons/io5'
import { FaLink } from "react-icons/fa6";


const Input = () => {
  return (
    <div className='w-full px-4 py-3 bg-slate-200 rounded-2xl'>
      <div className='flex items-center gap-2'>
        <FaLink  className='text-2xl'/>
        <input 
        
          type='text' 
          placeholder='Type a message...' 
          className='flex-1 input input-bordered bg-slate-200'
        />
        <button className='btn btn-primary border-none'>
          <IoSend className='text-xl ' />
        </button>
      </div>
    </div>
  )
}

export default Input
