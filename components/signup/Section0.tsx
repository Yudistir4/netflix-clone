import { sign } from 'crypto'
import Link from 'next/link'
import React from 'react'
import { signup } from '../../constants/staticText'

const Section0 = () => {
    return (
        <div className='flex flex-col gap-5 m-auto justify-center'>
            <div>

                <p className='text-xs'>STEP <span className='font-bold'>1</span> OF <span className='font-bold'>3</span>  </p>
                <h2 className='text-3xl font-semibold'>{signup.section0.title1} <br />{signup.section0.title2}  </h2>
            </div>
            <p className='font-semibold'>{signup.section0.p1} </p>

            <div>
                <p>{signup.section0.p2}</p>
                <p className='font-semibold'>Telole@mail.com</p>
            </div>

            <form >
                <input className='input' {...signup.section0.form} />
            </form>

            <a className='text-blue-600'>{signup.section0.p3}</a>

            <button className='bg-red-netflix py-3 rounded-md font-semibold text-xl'>{signup.section0.button}</button>

        </div>
    )
}

export default Section0