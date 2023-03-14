import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import Section3 from '../components/home/Section3';
import Section4 from '../components/home/Section4';
import Section5 from '../components/home/Section5';
import Section6 from '../components/home/Section6';
import Tv from '../components/home/Section2';
import { useRequireNoAuth } from '../hooks/useAuth';

const Index = () => {
  useRequireNoAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const signup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    router.push('/signup');
  };
  return (
    <div>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-between items-center absolute left-0 top-0  p-6 w-full z-10">
        <Image
          height="40"
          width="100"
          src="/assets/netflix-logo.svg"
          alt="netflix-logo"
        />
        <Link href={'/login'}>
          <a
            className="!bg-[#e50914] block rounded py-2 px-6 font-semibold"
            rel="noopener noreferrer"
          >
            Sign In
          </a>
        </Link>
      </div>
      <main className="bg-black pb-20">
        <div className="h-screen w-full relative">
          <Image
            src="/assets/bg-login.jpg"
            layout="fill"
            objectFit="cover"
            className="  brightness-75"
            alt="bg-login"
          />
          <div className="absolute gap-4 flex flex-col items-center justify-center left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] sm:max-w-[70%] ">
            <h1 className="text-3xl  text-center font-semibold sm:text-5xl">
              Unlimited movies, TV shows, and more.
            </h1>
            <h2 className="text-xl sm:text-2xl">
              Watch anywhere. Cancel anytime.
            </h2>
            <p className="text-xl text-center">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form
              onSubmit={signup}
              className="flex flex-col gap-3 w-full items-center lg:flex-row lg:gap-0 max-w-[800px]"
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
                className="w-full bg-white px-4 py-3 rounded outline-none placeholder-[gray] text-black lg:flex-1 lg:rounded-r-none"
              />
              <button className="bg-[#e50914] rounded py-3 lg:h-full px-6 font-bold lg:rounded-l-none flex items-center ">
                Get Started <ChevronRightIcon className="h-5" />
              </button>
            </form>
          </div>
        </div>
        <div className="">
          <div className="h-2 w-full bg-[#333]" />
          <Tv />
          <div className="h-2 w-full bg-[#333]" />
          <Section3 />
          <div className="h-2 w-full bg-[#333]" />
          <Section4 />
          <div className="h-2 w-full bg-[#333]" />
          <Section5 />
          <div className="h-2 w-full bg-[#333]" />
          <Section6 />
          {/* <MyModal /> */}
        </div>
      </main>
    </div>
  );
};

export default Index;
