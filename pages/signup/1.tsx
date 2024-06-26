import React, { ReactElement } from 'react';
import LayoutSignup from '../../components/LayoutSignup';
import { signup } from '../../constants/staticText';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Signup = () => {
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-xs flex flex-col items-center text-center gap-8"
    >
      <img className="w-60" src="/assets/signup-img1.png" alt="" />
      <div>
        <p className="text-xs pb-2">
          STEP <span className="font-bold">1</span> OF{' '}
          <span className="font-bold">3</span>{' '}
        </p>
        <h2 className="text-3xl font-semibold">{signup.section1.title} </h2>
      </div>
      <p className="leading-5">
        {signup.section1.p1} <br /> {signup.section1.p2} <br />{' '}
        {signup.section1.p3}
      </p>
      <Link
        href={'/signup/2'}
        // onClick={setSection}
      >
        <a className="w-full bg-red-netflix py-3 rounded-md font-semibold text-xl">
          {signup.section0.button}
        </a>
      </Link>
    </motion.div>
  );
};

export default Signup;
Signup.getLayout = function getLayout(page: ReactElement) {
  return <LayoutSignup>{page}</LayoutSignup>;
};
