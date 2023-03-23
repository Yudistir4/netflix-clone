import { yupResolver } from '@hookform/resolvers/yup';
import {
  checkActionCode,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { auth } from '../firebase';

interface FormData {
  password: string;
  confirmPassword: string;
}
const formSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
const ConfirmPassword = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: { password: '', confirmPassword: '' },
    resolver: yupResolver(formSchema),
  });
  const router = useRouter();
  const oobCode = router.query.oobCode?.toString() || '';
  const mode = router.query.mode;
  const [countdown, setCountdown] = useState(3);
  const [showCountdown, setShowCountdown] = useState(false);
  useEffect(() => {
    // Get the mode and oobCode from the URL search params

    // Check that the oobCode is valid
    // firebase.auth().
    checkActionCode(auth, oobCode)
      .then(() => console.log('oobCode Valid'))
      .catch(() => {
        console.error('Invalid oobCode');
        router.push('/forgotPassword');
      });

    // Set email value if mode is resetPassword
    if (mode === 'resetPassword') {
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => console.log('valid: ', email))
        .catch((error) => console.error(error));
    }
  }, [oobCode, router, mode]);

  const onSubmit = handleSubmit((data) => {
    confirmPasswordReset(auth, oobCode, data.password)
      .then(() => {
        console.log('Password reset complete');
        setShowCountdown(true);
      })
      .catch((error: any) => console.error(error));
  });

  useEffect(() => {
    if (!showCountdown) return;
    let intervalId: number;
    intervalId = window.setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      } else {
        clearInterval(intervalId);
        // navigate to the next page or reset the form, etc.
        router.push('/login');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown, showCountdown, router]);

  return (
    <div className="w-full">
      <div className="flex justify-between p-5 sm:p-10 items-center">
        <Image src="/assets/netflix-logo.svg" alt="" width={130} height={50} />
        <Link href="/login">
          <a className="text-red-600 text-xl font-bold">Sign In </a>
        </Link>
      </div>
      <form
        onSubmit={onSubmit}
        className="mx-5 xs:mx-auto flex flex-col gap-3 max-w-md p-5 bg-white text-black mt-20"
      >
        <h1 className="text-3xl font-bold">New Password</h1>
        {/* <p className="">
          We will send you an email with instructions on how to reset your
          password.
        </p> */}
        <div className="">
          <input
            {...register('password')}
            type="password"
            className="border p-3 border-gray-400 text-xl outline-none w-full"
            placeholder="new password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          )}
        </div>
        <div className="">
          <input
            {...register('confirmPassword')}
            type="password"
            className="border p-3 border-gray-400 text-xl outline-none w-full"
            placeholder="retype new password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={showCountdown}
          className="bg-blue-500 hover:brightness-110 p-3 text-white transition-all"
        >
          {showCountdown ? `Success` : 'Submit'}
        </button>
        {showCountdown && (
          <div className="m-auto">Redirecting in {countdown} seconds...</div>
        )}
      </form>
    </div>
  );
};

export default ConfirmPassword;

export async function getServerSideProps(context: any) {
  const { query } = context;

  if (!query.mode || !query.oobCode)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
