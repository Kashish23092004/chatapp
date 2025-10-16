import React from 'react'
import Left from './Left'
import Right from './Right'

const Mainchat = () => {
  return (
    <div className='flex h-screen overflow-hidden '>
        <Left/>
        <Right/>
    </div>
  )
}

export default Mainchat