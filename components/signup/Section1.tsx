import React from 'react'
import { signup } from '../../constants/staticText'
import { motion } from "framer-motion"
interface Props {
    setSection: () => void;
}

const section1 = ({ setSection }: Props) => {
    return (

        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='max-w-xs flex flex-col items-center text-center gap-8'>
            <img className='w-60' src="/assets/signup-img1.png" alt="" />
            <div>
                <p className='text-xs pb-2'>STEP <span className='font-bold'>1</span> OF <span className='font-bold'>3</span>  </p>
                <h2 className='text-3xl font-semibold'>{signup.section1.title} </h2>
            </div>
            <p className='leading-5'>{signup.section1.p1} <br /> {signup.section1.p2} <br /> {signup.section1.p3}
            </p>
            <button onClick={setSection} className='w-full bg-red-netflix py-3 rounded-md font-semibold text-xl'>{signup.section0.button}</button>

        </motion.div>

    )
}

export default section1