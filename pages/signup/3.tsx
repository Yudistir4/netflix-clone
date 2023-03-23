import React, { ReactElement } from 'react';
import LayoutSignup from '../../components/LayoutSignup';
import useAuth, { useRequireWithAuthAndNoSubscribe } from '../../hooks/useAuth';
import { signup } from '../../constants/staticText';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BsCheck2 } from 'react-icons/bs';
import { useRouter } from 'next/router';
const Signup = () => {
  useRequireWithAuthAndNoSubscribe();
  const { user, userDetail, updateUserDetail } = useAuth();
  const router = useRouter();

  const submit = async () => {
    if (!user) return;

    await updateUserDetail({
      id: userDetail!.id,
      userID: userDetail!.userID,
      hasPaid: userDetail!.hasPaid,
      planType: userDetail!.planType,
      signupSlideNumber:
        userDetail!.signupSlideNumber > 3 ? userDetail!.signupSlideNumber : 3,
    });
    router.push('/signup/4');
  };

  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-xs w-full flex flex-col items-center text-center  gap-5"
    >
      <Image
        height={50}
        width={50}
        src="/assets/checkmark.png"
        alt="checkmark"
      />
      <div>
        <p className="text-xs pb-2">
          STEP <span className="font-bold">2</span> OF{' '}
          <span className="font-bold">3</span>{' '}
        </p>
        <h2 className="text-3xl font-semibold">{signup.section3.title} </h2>
      </div>
      <ul className="text-left flex gap-5 flex-col px-3">
        {signup.section3.checklist.map((val) => (
          <li key={val} className="flex  gap-2 text-lg">
            <BsCheck2 className="text-4xl text-red-600" />
            {val}{' '}
          </li>
        ))}
      </ul>

      <button
        onClick={submit}
        className="w-full bg-red-netflix py-3 rounded-md font-semibold text-xl"
      >
        {signup.section0.button}
      </button>
    </motion.div>
  );
};

export default Signup;
Signup.getLayout = function getLayout(page: ReactElement) {
  return <LayoutSignup>{page}</LayoutSignup>;
};
