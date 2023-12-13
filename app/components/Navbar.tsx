'use client'

import { Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Logo from '../../public/logo.png'
import Image from 'next/image'

const NavLinks = () => {
  const currentPath = usePathname()

  const links = [
    { label: "Questions", href: "/" },
    { label: "Hot", href: "/dashboard/issues" },
  ]

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
  )
}

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="6">
            <Link href="/">
              <Image alt='logo' width={'80'} height={'50'} src={Logo} />
            </Link>
            <Flex gap="6" className="flex-grow">
            <NavLinks />
          </Flex>
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === "loading") return <Skeleton width="3rem" height={'1.7rem'} />

  return (
    <Box className='pl-5'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button highContrast variant='outline' size="2">{session!.user!.name}</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <Button variant='solid' size={'2'} onClick={() => signOut({
              redirect: true,
              callbackUrl: '/'
            })}>Log out</Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default Navbar