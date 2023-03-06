import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { home } from '../../constants/staticText'

const Section2 = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center gap-4 px-10 py-10 lg:flex-row">
            <div className="relative z-20 lg:w-1/2 flex flex-col justify-center items-center gap-5 text-center lg:text-left lg:pl-10">
                <h2 className="text-3xl sm:text-5xl font-bold w-full">{home.section2.title}</h2>
                <p className="text-xl lg:text-2xl">{home.section2.p}</p>
            </div>
            <div className="relative lg:w-1/2 -mt-[10%] lg:m-0">

                <img src="/assets/tv.png" alt="" className=' relative   w-full z-10  -m' />
                {/* <img src="/assets/tv.png" alt="" className=' absolute z-10 w-[400px] object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ' /> */}
                <div className="w-[74%]   absolute z-0 top-[48.5%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative pt-[56.25%] w-full  ">

                        {show &&
                            <ReactPlayer
                                url="/assets/video-tv.m4v"
                                // url="https://www.youtube.com/watch?v=TICOh6P0LV4&list=RDTICOh6P0LV4&start_radio=1"

                                width="100%"
                                height="100%"
                                style={{ position: 'absolute', top: 0, left: 0 }}
                                playing
                                muted={true}
                                loop={true}
                            />}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Section2


