import { Checkbox } from '@chakra-ui/react'
import { sign } from 'crypto'
import { MotionConfig } from 'framer-motion';
import React from 'react'
import { signup } from '../../constants/staticText'
import { motion } from 'framer-motion'
import { useForm } from "react-hook-form"


interface Props {
    setSection: () => void;
    setData: (value: React.SetStateAction<{
        email: string;
        password: string;
    }>) => void

}
type FormData = {
    email: string;
    password: string;
}


const Section2 = ({ setSection, setData }: Props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ defaultValues: { email: localStorage.getItem("email") || "", password: "" } });
    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        setData(data)

    });

    const coba = ["email", "password"]
    return (

        <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='max-w-md flex flex-col items-center   gap-5 mx-4'>

            <div>
                <p className='text-xs pb-2'>STEP <span className='font-bold'>1</span> OF <span className='font-bold'>3</span>  </p>
                <h2 className='text-3xl font-semibold'>{signup.section2.title} </h2>
            </div>
            <p className='w-full'>{signup.section2.p1} <br /> {signup.section2.p2}
            </p>
            <div className='flex flex-col gap-3 w-full'>

                {signup.section2.form.map((val: any, i) => <input key={i} {...register(val.name)}   {...val} className="input " />)}
                <Checkbox size="lg"> {signup.section2.checkBox}</Checkbox>
                <button onClick={() => { onSubmit(); setSection(); }} className='w-full bg-red-netflix py-3 rounded-md font-semibold text-xl'>{signup.section0.button}</button>
            </div>

        </motion.div>

    )
}

export default Section2