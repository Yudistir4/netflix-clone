import { sign } from 'crypto';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Section1 from '../components/signup/Section1';
import Section2 from '../components/signup/Section2';
import Section3 from '../components/signup/Section3';
import Section4 from '../components/signup/Section4';
import Section5 from '../components/signup/Section5';
import useAuth from '../hooks/useAuth';

const Signup = () => {
  const { user, logout } = useAuth();
  const [section, setSection] = useState(1);
  const [data, setData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    console.log(data);
    // signUp(data.email,data.password)
  };

  return (
    <div className="bg-black h-full ">
      <Head>
        <title>Netflix | Signup</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-between items-center   p-6 w-full z-10 border-b border-[#333]">
        <Link href="/">
          <a>
            <Image
              height="40"
              width="100"
              src="/assets/netflix-logo.svg"
              className="cursor-pointer"
            />
          </a>
        </Link>
        {user ? (
          <button onClick={logout} className=" font-semibold">
            {' '}
            Sign Out
          </button>
        ) : (
          <Link href="/login" className="font-semibold">
            Sign In
          </Link>
        )}
      </div>
      <main className="h-[calc(100%-90px)] min-h-[calc(100vh-90px)] flex justify-center items-center">
        {/* <Section0 /> */}

        {section === 1 && <Section1 setSection={() => setSection(2)} />}
        {section === 2 && (
          <Section2 setSection={() => setSection(3)} setData={setData} />
        )}
        {section === 3 && <Section3 setSection={() => setSection(4)} />}
        {section === 4 && <Section4 setSection={() => setSection(5)} />}
        {section === 5 && <Section5 onSubmit={onSubmit} />}
      </main>
    </div>
  );
};

export default Signup;

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
