import { Checkbox } from '@chakra-ui/react'
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { sign } from 'crypto'
import { link } from 'fs/promises'
import Image from 'next/image'
import React from 'react'
import { signup } from '../../constants/staticText'
import { BsCheck2 } from "react-icons/bs"
import { motion } from "framer-motion"

interface Props {

    onSubmit: () => void
}
const Section5 = ({ onSubmit }: Props) => {
    return (
        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='m-5 max-w-md w-full flex flex-col items-center text-center gap-5'>
            <Image height={50} width={50} src="/assets/lock.png" />
            <div className='mt-5'>
                <p className='text-xs pb-2'>STEP <span className='font-bold'>3</span> OF <span className='font-bold'>3</span>  </p>
                <h2 className='text-3xl font-semibold'>{signup.section5.title} </h2>
            </div>
            <p>{signup.section5.p1}</p>
            <p className='font font-semibold'>{signup.section5.p2[1]} <br />{signup.section5.p2[2]}</p>
            <div className='text-left flex gap-2 flex-col w-full'>

                {signup.section5.payments.map(val => (
                    <button onClick={onSubmit} key={val.text} className='flex  gap-2 text-lg items-center border-2 border-[gray]  rounded px-3 py-2 justify-between'>
                        <div className='flex gap-2 items-center'>
                            <span className='mr-2'>
                                {val.text}
                            </span>
                            {val.images.map(img => <Image key={img} height={40} width={40} src={img} />)}
                        </div>
                        <ChevronRightIcon className='h-7 text-[gray]' />
                    </button>
                ))}

            </div>


        </motion.div >
    )
}

export default Section5