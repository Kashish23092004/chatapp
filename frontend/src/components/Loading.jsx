import React from 'react'

const Loading = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999  // ensure overlay
    }}>
      <div className="flex w-52 flex-col gap-4 p-4 rounded-lg shadow items-center justify-center animate-pulse align-middle bg-slate-600  h-fit">
        <div className="flex items-center gap-4">
          <div className="skeleton bg-slate-400 h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20 bg-slate-400"></div>
            <div className="skeleton h-4 w-28 bg-slate-400"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full bg-slate-400"></div>
      </div>
    </div>
  )
}

export default Loading
