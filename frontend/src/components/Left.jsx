import React from 'react'
import Search from './Search'
import Message from './Messge'

const Left = () => {
  return (
    <div className='bg-white h-screen w-[30%] flex flex-col'>
      <Search />
      <div className="flex-1 overflow-hidden">
        <Message />
      </div>
    </div>
  )
}

export default Left