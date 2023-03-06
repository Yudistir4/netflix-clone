import React from 'react'
import { home } from '../../constants/staticText'

const Section3 = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 px-10 py-10   lg:flex-row-reverse">
            <div className="relative z-20 lg:w-1/2 flex flex-col justify-center items-center gap-5 text-center lg:text-left lg:pl-10">
                <h2 className="text-3xl sm:text-5xl font-bold w-full">{home.section3.title}</h2>
                <p className="text-xl sm:text-2xl">{home.section3.p}</p>
            </div>
            <div className="relative lg:w-1/2 -mt-[5%] lg:m-0  ">

                <img src="/assets/mobile.jpg" alt="" className='relative   w-full z-10  -m' />
                <div className="z-10 h-[20%] py-2 px-4 gap-5 absolute w-[70%] left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2  bg-black rounded-xl border-2 border-[#333] flex items-center">
                    <img src="/assets/boxshot.png" className='h-full object-cover' alt="" />

                    <div className="flex-1">
                        <p className='text-base sm:text-2xl font-bold'>{home.section3.card.title} </p>
                        <p className="text-blue-600 sm:text-xl">{home.section3.card.p} </p>
                    </div>
                    <img src="/assets/download-icon.gif" className="h-full" alt="" />
                </div>
            </div>

        </div >
    )
}

export default Section3