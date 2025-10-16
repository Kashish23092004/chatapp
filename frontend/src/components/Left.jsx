import React from 'react'
import Search from './Search'
import Message from './Messge'

const Left = () => {
  return (
    <div className='bg-white h-screen w-[30%] flex flex-col 
    '>
      <Search />
      <Message />
     
    </div>
  )
}

export default Left
