import { Checkbox } from '@chakra-ui/react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { sign } from 'crypto'
import { link } from 'fs/promises'
import Image from 'next/image'
import React, { useState } from 'react'
import { signup } from '../../constants/staticText'
import { BsCheck2 } from "react-icons/bs"
import { motion } from 'framer-motion'
interface Props {
    setSection: () => void;
}
const Section4 = ({ setSection }: Props) => {
    const [selected, setSelected] = useState(0)


    return (
        // <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>

        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='max-w-4xl w-full flex flex-col  h-full  gap-5 p-5 bg-black'>

            <div>
                <p className='text-xs pb-2'>STEP <span className='font-bold'>2</span> OF <span className='font-bold'>3</span>  </p>
                <h2 className='text-3xl font-semibold'>{signup.section4.title} </h2>
            </div>
            <ul className=' flex gap-2 flex-col'>

                {signup.section4.checklist.map((val) => (
                    <li key={val} className='flex  gap-2 text-lg items-center'><BsCheck2 className='text-2xl text-red-netflix' />{val} </li>
                ))}

            </ul>

            {/* Plans */}
            <div className='flex'>
                <div className='hidden sm:block sm:w-[30%]'></div>
                <div className='flex justify-end  w-full sm:w-[70%]'>
                    {signup.section4.plans.map((val, i) => (
                        <div onClick={() => setSelected(i)} key={i} className={`${selected === i ? `after:block after:absolute after:border-[15px] after:border-transparent after:border-t-[#e50914] after:top-full after:content-[""] ` : "opacity-50"} w-[25%] relative bg-red-netflix text-center flex justify-center items-center h-20 font-bold text-xs rounded-[2px] cursor-pointer  m-[6px] md:h-32`}>{val} </div>)
                    )}

                </div>
            </div>

            {/* PLANS Table */}
            <table className='text-center'>
                <tbody className='divide-y divide-[gray]'>
                    {signup.section4.plansTable.map((val, i) => (
                        <tr className='flex flex-wrap' key={i}>
                            {val.map((data, j) =>
                                <td key={data + j} className={`${j == 0 ? "w-full pt-3 sm:w-[30%]" : `w-1/4 sm:w-[17.5%] font-semibold py-3 px-2`} ${selected === j - 1 ? "text-red-netflix" : j != 0 ? " opacity-50" : "sm:text-left"} px-3 text-xs`}>{data}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className='text-xs max-w-2xl' >{signup.section4.p1} <br /> <br /> {signup.section4.p2} </p>
            <button onClick={setSection} className=' max-w-sm m-auto w-full bg-red-netflix py-3 rounded-md font-semibold text-xl'>{signup.section0.button}</button>

        </motion.div >
        // </motion.div>
    )
}

export default Section4