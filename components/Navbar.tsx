import { BellIcon } from '@heroicons/react/24/solid'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import useAuth from '../hooks/useAuth'

const Navbar = () => {

    const { logout } = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)

        }
    }, [])

    console.log(isScrolled)
    return (
        <div className={`${isScrolled && 'bg-[#141414]'} transition duration-300 flex items-center justify-between p-3 sticky top-0 z-50`}>
            <div className="flex items-center">

                <Image className="cursor-pointer object-contain" alt='' src="/assets/netflix-logo.svg" width={100} height={40} />
                <ul className=" items-center gap-3 ml-8 text-[#e5e5e5] hidden md:flex">
                    <li className="hover:text-[#b3b3b3] transition cursor-pointer">Home</li>
                    <li className="hover:text-[#b3b3b3] transition cursor-pointer">Tv Shows</li>
                    <li className="hover:text-[#b3b3b3] transition cursor-pointer">Movies</li>
                    <li className="hover:text-[#b3b3b3] transition cursor-pointer">News & Popular</li>
                    <li className="hover:text-[#b3b3b3] transition cursor-pointer">My List</li>
                </ul>
            </div>

            <div className="flex items-center gap-3">
                <FaSearch />
                <BellIcon className='h-6 w-6 ' />
                <Menu >
                    <MenuButton>
                        <img src="/assets/person.png" className="rounded" alt="" />
                    </MenuButton>
                    <MenuList className="!bg-black !border-none">
                        <MenuItem onClick={logout} _hover={{ backgroundColor: "#333" }} _focus={{ backgroundColor: "none" }}>Logout</MenuItem>

                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}

export default Navbar