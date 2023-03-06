import React from 'react'
import { home } from '../../constants/staticText'

const Section5 = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 px-10 py-10   lg:flex-row-reverse">
            <div className="relative z-20 lg:w-1/2 flex flex-col justify-center items-center gap-5 text-center lg:text-left lg:pl-10">
                <h2 className="text-3xl sm:text-5xl font-bold w-full">{home.section3.title}</h2>
                <p className="text-xl sm:text-2xl">{home.section3.p}</p>
            </div>
            <div className="relative lg:w-1/2   lg:m-0  ">
                <img src="/assets/kids.png" alt="" className='relative object-contain m-auto   lg:h-[330px] z-10 ' />
            </div>

        </div >
    )
}

export default Section5