/* eslint-disable @next/next/no-img-element */
import { BellIcon, XMarkIcon } from '@heroicons/react/24/solid';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';
import useClickOutside from '../hooks/useClickOutside';
import requests from '../services/config';
import { useRecoilState } from 'recoil';
import { searchMoviesState, searchState } from '../atoms/modalAtom';
import { useRouter } from 'next/router';

const routes = [
  { name: 'Home', href: '/browse' },
  { name: 'Tv Shows', href: '/tvshows' },
  { name: 'Movies', href: '/movies' },
  { name: 'News & Popular', href: '/newsandpopular' },
  { name: 'My List', href: '/mylist' },
];

const Navbar = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useRecoilState(searchState);
  const [searchResult, setSearchResult] = useRecoilState(searchMoviesState);
  const [showInputSearch, setShowInputSearch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useClickOutside(ref, () => {
    if (search) return;
    setShowInputSearch(false);
  });
  console.log(isScrolled);

  const handleSearch = async () => {
    if (!search) {
      if (router.pathname === '/search') router.back();
      return;
    }
    if (router.pathname !== '/search') router.push('/search');
    fetch(requests.search + search).then(async (res) => {
      const data = await res.json();
      setSearchResult(data.results);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <div
      className={`${
        isScrolled
          ? 'bg-[#141414]'
          : 'shadow-xl shadow-black/5 bg-black/10  backdrop-blur-[1px]'
      }  transition duration-300 flex items-center justify-between px-5 py-3 sticky top-0 z-50 sm:text-xl sm:px-10 `}
    >
      <div className="flex items-center">
        <Link href="/browse">
          <a>
            <Image
              className="cursor-pointer object-contain"
              alt=""
              src="/assets/netflix-logo.svg"
              width={100}
              height={40}
            />
          </a>
        </Link>
        <ul className=" items-center gap-3 ml-8 text-[#e5e5e5] hidden md:flex">
          {routes.map((data) => (
            <li
              key={data.href}
              onClick={() => {
                setSearch('');
                setShowInputSearch(false);
              }}
              className="hover:text-[#b3b3b3] transition cursor-pointer"
            >
              <Link href={data.href}>
                <a>{data.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        {/* INPUT SEARCH */}
        <div
          className={`${
            showInputSearch && 'w-[300px]'
          } relative flex items-center w-10 h-12  transition-all`}
          ref={ref}
        >
          {/* {showInputSearch && ( */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Judul, orang, genre"
            className={`${
              showInputSearch ? 'block opacity-100 px-10' : 'absolute opacity-0'
            } w-full bg-transparent border-2 h-full outline-none   bg-[#141414] `}
          />
          {/* )} */}

          <FaSearch
            onClick={() => setShowInputSearch(true)}
            className={`${
              showInputSearch
                ? 'absolute left-2 top-1/2 -translate-y-1/2'
                : 'left-1/2 translate-x-1/2'
            } cursor-pointer`}
          />
          {search && (
            <XMarkIcon
              onClick={() => setSearch('')}
              className={`absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer h-7 bg-[#141414]`}
            />
          )}
        </div>
        <BellIcon className="h-7 w-7 " />
        <Menu>
          <MenuButton>
            <img src="/assets/person.png" className="rounded" alt="" />
          </MenuButton>
          <MenuList className="!bg-black !border-none">
            <MenuItem
              onClick={logout}
              _hover={{ backgroundColor: '#333' }}
              _focus={{ backgroundColor: 'none' }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
