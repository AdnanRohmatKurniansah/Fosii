'use client'

import { Box, Button, Container, DropdownMenu, Flex, TextField } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Logo from '../../public/logo.png';
import Image from 'next/image';
import { AiOutlineSearch } from 'react-icons/ai';

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Questions", href: "/dashboard/questions" }
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={link.href === currentPath ? 'text-slate-600' : ''}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyword = searchRef.current?.value;
  
    if (!keyword || keyword.trim() === "") return
  
    if (event.key === "Enter") {
      event.preventDefault()
      router.push(`/dashboard/questions/search/${keyword}`)
    }
  };
  


  return (
    <nav className="border-b mb-5 px-5 py-3 sticky top-0 z-10 bg-white">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="6">
            <Link href="/dashboard">
              <Image alt='logo' width={'80'} height={'50'} src={Logo} />
            </Link>
            <Flex gap="6" className="flex-grow">
              <NavLinks />
            </Flex>
          </Flex>
          <Flex align={'center'} gap={'2'}>
            <div className="hidden md:flex w-[550px]">
              <SearchInput searchRef={searchRef} handleSearch={handleSearch}/>
            </div>
            <div className="flex md:hidden">
              <SearchButton onClick={toggleSearch} />
            </div>
          </Flex>
          <Flex align="center" gap="2">
              {isSearchVisible && (
                <div className="absolute top-full left-0 right-0 mx-3 mt-2 bg-white border-b border-gray-200 z-10">
                  <SearchInput searchRef={searchRef} handleSearch={handleSearch}/>
                </div>
              )}
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className='bg-transparent mx-5' onClick={onClick}>
      <AiOutlineSearch className="w-5 h-5" />
    </button>
  );
}

interface SearchInputProps {
  searchRef: React.RefObject<HTMLInputElement>;
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void
}


const SearchInput: React.FC<SearchInputProps> = ({ searchRef, handleSearch }) => {
  return (
    <TextField.Root className='w-full'>
      <TextField.Input ref={searchRef} onKeyDown={handleSearch} type="text" placeholder="Search..." className="py-1" />
    </TextField.Root>
  );
};


const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" height={'1.7rem'} />;

  return (
    <Box className='pl-5'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button highContrast variant='outline' size="2">{session!.user!.name}</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <Link href={'/dashboard/my-questions'}>My Questions</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => signOut({
              redirect: true,
              callbackUrl: '/'
            })}>
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}

export default Navbar;
