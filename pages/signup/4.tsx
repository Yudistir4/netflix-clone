import React, { ReactElement, useEffect, useState } from 'react';
import LayoutSignup from '../../components/LayoutSignup';
import useAuth, { useRequireWithAuthAndNoSubscribe } from '../../hooks/useAuth';
import { signup } from '../../constants/staticText';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsCheck2 } from 'react-icons/bs';
import { PlanType } from '../../typing';
import { useRouter } from 'next/router';

const planType: PlanType[] = ['mobile', 'basic', 'standard', 'premium'];
const Signup = () => {
  useRequireWithAuthAndNoSubscribe();
  const { user, userDetail, updateUserDetail } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    console.log('selected');
    userDetail?.planType && setSelected(planType.indexOf(userDetail?.planType));
  }, [userDetail]);
  const submit = async () => {
    console.log(userDetail);
    if (!user || !userDetail) return;
    console.log(userDetail);
    // if {selected === 0}
    await updateUserDetail({
      id: userDetail!.id,
      userID: userDetail!.userID,
      hasPaid: userDetail!.hasPaid,
      planType: planType[selected],
      signupSlideNumber: 4,
    });
    router.push('/signup/5');
  };
  // useEffect(() => {
  //   submit();
  // }, [user, userDetail, updateUserDetail, selected]);
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl w-full flex flex-col  h-full  gap-5 p-5 bg-black"
    >
      <div>
        <p className="text-xs pb-2">
          STEP <span className="font-bold">2</span> OF{' '}
          <span className="font-bold">3</span>{' '}
        </p>
        <h2 className="text-3xl font-semibold">{signup.section4.title} </h2>
      </div>
      <ul className=" flex gap-2 flex-col">
        {signup.section4.checklist.map((val) => (
          <li key={val} className="flex  gap-2 text-lg items-center">
            <BsCheck2 className="text-2xl text-red-netflix" />
            {val}{' '}
          </li>
        ))}
      </ul>

      {/* Plans */}
      <div className="flex">
        <div className="hidden sm:block sm:w-[30%]"></div>
        <div className="flex justify-end  w-full sm:w-[70%]">
          {signup.section4.plans.map((val, i) => (
            <div
              onClick={() => setSelected(i)}
              key={i}
              className={`${
                selected === i
                  ? `after:block after:absolute after:border-[15px] after:border-transparent after:border-t-[#e50914] after:top-full after:content-[""] `
                  : 'opacity-50'
              } w-[25%] relative bg-red-netflix text-center flex justify-center items-center h-20 font-bold text-xs rounded-[2px] cursor-pointer  m-[6px] md:h-32`}
            >
              {val}{' '}
            </div>
          ))}
        </div>
      </div>

      {/* PLANS Table */}
      <table className="text-center">
        <tbody className="divide-y divide-[gray]">
          {signup.section4.plansTable.map((val, i) => (
            <tr className="flex flex-wrap" key={i}>
              {val.map((data, j) => (
                <td
                  key={data + j}
                  className={`${
                    j == 0
                      ? 'w-full pt-3 sm:w-[30%]'
                      : `w-1/4 sm:w-[17.5%] font-semibold py-3 px-2`
                  } ${
                    selected === j - 1
                      ? 'text-red-netflix'
                      : j != 0
                      ? ' opacity-50'
                      : 'sm:text-left'
                  } px-3 text-xs`}
                >
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs max-w-2xl">
        {signup.section4.p1} <br /> <br /> {signup.section4.p2}{' '}
      </p>

      <button
        onClick={submit}
        className="text-center max-w-sm m-auto w-full bg-red-netflix py-3 rounded-md font-semibold text-xl"
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
