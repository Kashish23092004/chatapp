import React from 'react'

const Search = () => {
  return (
    <div>
        <label className="input bg-blue-50 rounded-2xl m-4 w-[90%]">
  <svg className="h-[1em] opacity-50 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input className='text-black'type="search" required placeholder="Search" />
</label>
    </div>
  )
}

export default Search