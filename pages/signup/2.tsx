import React, { ReactElement, useEffect, useState } from 'react';
import LayoutSignup from '../../components/LayoutSignup';
import useAuth, { useRequireWithAuthAndNoSubscribe } from '../../hooks/useAuth';
import { signup } from '../../constants/staticText';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Checkbox } from '@chakra-ui/react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import Link from 'next/link';

type FormData = {
  email: string;
  password: string;
};
const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

type Field = {
  name: 'email' | 'password';
  placeholder: string;
  type: string;
};

const fields: Field[] = [
  { placeholder: 'Email', name: 'email', type: 'email' },
  { placeholder: 'Add a password', name: 'password', type: 'password' },
];

const Signup = () => {
  // useRequireWithAuthAndNoSubscribe();
  // useRequireAuth();
  const { signUp, loading, error, user, userDetail, updateUserDetail } =
    useAuth();
  console.log(user);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: localStorage.getItem('email') || '', password: '' },
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    const errStatus = await signUp(data.email, data.password);

    if (errStatus) return;

    router.push('/signup/3');
  });

  const submit = async () => {
    if (!user) return;
    console.log(userDetail);
    await updateUserDetail({
      id: userDetail!.id,
      userID: userDetail!.userID,
      hasPaid: userDetail!.hasPaid,
      planType: userDetail!.planType,
      signupSlideNumber:
        userDetail!.signupSlideNumber > 2 ? userDetail!.signupSlideNumber : 2,
    });
    router.push('/signup/3');
  };

  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md flex flex-col items-center   gap-5 mx-4 "
    >
      <div className="w-full">
        <p className="text-xs pb-2">
          STEP <span className="font-bold">1</span> OF{' '}
          <span className="font-bold">3</span>{' '}
        </p>
        <h2 className="text-3xl font-semibold">
          {user ? 'Account Created' : signup.section2.title}{' '}
        </h2>
      </div>
      {user ? (
        <>
          <p className="">Use this email to access your account:</p>
          <p className="font-bold">{user.email}</p>

          <a
            onClick={submit}
            className="w-full bg-red-netflix py-3 rounded-md font-semibold text-xl flex items-center justify-center"
          >
            Next
          </a>
        </>
      ) : (
        <>
          <p className="w-full">
            {signup.section2.p1} <br /> {signup.section2.p2}
          </p>

          <div className="flex flex-col gap-3 w-full">
            {fields.map((val: Field, i) => (
              <div key={i} className="">
                <input {...register(val.name)} {...val} className="input " />
                {errors[val.name] && (
                  <p className="text-sm text-red-500">
                    {errors[val.name]!.message}
                  </p>
                )}
              </div>
            ))}
            {error && (
              <p className="text-sm text-center bg-red-500/20 rounded p-3 text-red-500">
                {error}
              </p>
            )}

            <Checkbox size="lg"> {signup.section2.checkBox}</Checkbox>
            <button
              onClick={() => {
                onSubmit();
              }}
              className="w-full bg-red-netflix py-3 rounded-md font-semibold text-xl flex items-center justify-center"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
              ) : (
                signup.section0.button
              )}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Signup;
Signup.getLayout = function getLayout(page: ReactElement) {
  return <LayoutSignup>{page}</LayoutSignup>;
};
