import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const NavbarSignup = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center   p-6 w-full z-10 border-b border-[#333]">
      <Link href="/">
        <a>
          <Image
            height="40"
            width="100"
            src="/assets/netflix-logo.svg"
            className="cursor-pointer"
            alt="netflix-logo"
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
  );
};

export default NavbarSignup;
