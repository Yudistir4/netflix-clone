import { Checkbox } from '@chakra-ui/react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { sign } from 'crypto'
import { link } from 'fs/promises'
import Image from 'next/image'
import React from 'react'
import { signup } from '../../constants/staticText'
import { BsCheck2 } from "react-icons/bs"
import { motion } from "framer-motion"
interface Props {
    setSection: () => void;
}
const Section3 = ({ setSection }: Props) => {
    return (

        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='max-w-xs w-full flex flex-col items-center text-center  gap-5'>
            <Image height={50} width={50} src="/assets/checkmark.png" />
            <div>
                <p className='text-xs pb-2'>STEP <span className='font-bold'>2</span> OF <span className='font-bold'>3</span>  </p>
                <h2 className='text-3xl font-semibold'>{signup.section3.title} </h2>
            </div>
            <ul className='text-left flex gap-5 flex-col px-3'>

                {signup.section3.checklist.map(val => (
                    <li key={val} className='flex  gap-2 text-lg'><BsCheck2 className='text-4xl text-red-600' />{val} </li>
                ))}

            </ul>

            <button onClick={setSection} className='w-full bg-red-netflix py-3 rounded-md font-semibold text-xl'>{signup.section0.button}</button>

        </motion.div >

    )
}

export default Section3