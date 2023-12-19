import Link from 'next/link'
import React from 'react'
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="footer mt-10">
        <div className="border-t border-gray-200">
            <div className="container mx-auto py-6 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-center sm:text-left">© 2023 Fosi —
                <Link href="https://github.com/AdnanRohmatKurniansah" rel="noopener noreferrer" className="ml-1" target="_blank">AdnanRK</Link>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <Link style={{ fontSize: '24px' }} href={''} target='_blank' className="">
                    <AiFillFacebook />
                </Link>
                <Link style={{ fontSize: '24px' }} href={'https://github.com/AdnanRohmatKurniansah'} target='_blank' className="ml-3 ">
                    <AiFillGithub />
                </Link>
                <Link style={{ fontSize: '24px' }} href={'https://www.linkedin.com/in/adnan-rohmat-kurniansah-41576827a/'} target='_blank' className="ml-3 ">
                    <AiFillLinkedin />
                </Link>
            </span>
            </div>
        </div>
    </footer>
  )
}

export default Footer