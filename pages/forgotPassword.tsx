import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';

interface FormData {
  email: string;
}
const emailSchema = yup.object().shape({
  email: yup.string().email().required(),
});
const ForgotPassword = () => {
  const { forgotPassword, loading, error } = useAuth();
  const [status, setStatus] = useState(false);
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { email: '' },
    resolver: yupResolver(emailSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    const status = await forgotPassword(data.email);
    setStatus(status);
  });

  return (
    <div className="w-full">
      <div className="flex justify-between p-5 sm:p-10 items-center">
        <Image src="/assets/netflix-logo.svg" alt="" width={170} height={50} />
        <Link href="/login">
          <a className="text-red-600 text-xl font-bold">Sign In </a>
        </Link>
      </div>
      <form
        onSubmit={onSubmit}
        className="m-auto flex flex-col gap-3 max-w-md p-5 bg-white text-black mt-20"
      >
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="">
          We will send you an email with instructions on how to reset your
          password.
        </p>
        <input
          {...register('email')}
          type="email"
          className="border p-3 border-gray-400 text-xl outline-none"
          placeholder="name@example.com"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={status}
          className={`${
            status ? 'bg-green-500' : 'bg-blue-500'
          }  hover:brightness-110 p-3 text-white transition-all`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl" />
          ) : status ? (
            'Check your email now!!'
          ) : (
            'Email Me'
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
