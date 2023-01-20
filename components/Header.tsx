import Image from "next/image"
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image 
          src="https://logos-marques.com/wp-content/uploads/2021/03/Netflix-logo.png" 
          width={100} 
          height={100} 
          className="cursor-pointer object-contain" 
          alt="Logo" 
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">News & Populars</li>
          <li className="headerLink">My List</li>
        </ul> 
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* <Link href="/account"> */}
          <Image onClick={() => logout()} src="https://rb.gy/g1pwyx" width={30} height={30} alt="account" className="cursor-pointer rounded" />
        {/* </Link> */}
      </div>
    </header>
  )
}

export default Header