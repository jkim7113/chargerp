"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    async function initProviders(){
      const response = await getProviders();
      setProviders(response)
    }
    initProviders();
  }, []);

  return (
    <nav className='z-20 backdrop-blur-xl bg-white/70 fixed top-0 z-20 max-w-7xl mx-auto sm:px-16 px-6 flex-between w-full py-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image className='object-contain' src='/images/centennial.svg' alt="Centennial Logo" width={30} height={30} />
        <p className='ml-2 logo_text'>Centennial Peer Tutoring Club</p>
      </Link>

      <div className='sm:flex hidden'>
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link className='blue_btn' href='/questions/new'>Ask Question</Link>
              <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
              <Link href='/profile'>
                <Image className='rounded-full' src={session?.user.image} width={38} height={38} alt='profile' />
              </Link>
            </div>
          ) : (
            <>
            {
              providers && Object.values(providers).map((provider) => (
                <button className='blue_btn' type='button' key={provider.id} onClick={() => signIn(provider.id)}>Sign In</button>
              ))
            }
            </>
          )
        }
      </div>

      <div className='sm:hidden flex relative'>
        { session?.user ? (
            <div className='flex'>
              <Image className='rounded-full' src={session?.user.image} width={38} height={38} alt='profile' onClick={() => setToggleDropdown((prev) => !prev)} />
              { toggleDropdown && (
                  <div className='dropdown'>
                    <Link className='dropdown_link' href='/profile' onClick={() => setToggleDropdown(false)}>My Profile</Link>
                    <Link className='dropdown_link' href='/questions/new' onClick={() => setToggleDropdown(false)}>Ask a question</Link>
                    <button className='outline_btn mt-5' type='button' 
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    >Sign Out</button>
                  </div>
              )}
            </div>
          ) : (
            <>
            {
              providers && Object.values(providers).map((provider) => (
                <button className='blue_btn' type='button' key={provider.id} onClick={() => signIn(provider.id)}>Sign In</button>
              ))
            }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav