import React from 'react'
import Text from './Text'
import Input from './Input'
import Notext from './Notext'
const Right = () => {
    return (
        <div className="w-full h-screen flex flex-col">
            {/* Fixed Navbar */}
            <div className="navbar bg-slate-500 shadow-sm">
                <div className='ml-[2%]'>
                    <div className="avatar avatar-offline">
                        <div className="w-14 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col ml-[1%]'>
                    <a className='poppins-regular'>Kashish</a>
                    <a className='poppins-medium'>online</a>
                </div>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 bg-slate-600 overflow-y-auto no-scrollbar">
               {<Text />}
                {/*<Notext/>*/}
            </div>
            {/*input area */}
             <Input/>
        </div>
    )
}

export default Right
