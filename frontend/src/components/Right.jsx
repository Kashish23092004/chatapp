import React from 'react'
import Text from './Text'
const Right = () => {
    return (
        <div className="w-full ">
            <div class="navbar bg-slate-500  shadow-sm ">
                <div className='ml-[2%]'>
                    <div className="  avatar avatar-offline">
                        <div className="w-14 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col ml-[1%]'>
                    <a className='poppins-regular' >Kashish</a>
                    <a className='poppins-medium'>online</a>
                </div>
            </div>
            <div className="h-[100%] bg-slate-600 overflow-y-auto pr-2 no-scrollbar">
                <Text/>
            </div>
        </div>
    )
}

export default Right