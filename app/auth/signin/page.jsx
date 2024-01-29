'use client';

import Image from "next/image";

import { getProviders, signIn } from "next-auth/react"
import { useState, useEffect } from "react";

export default function SignIn() {
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    async function initProviders(){
      const response = await getProviders();
      setProviders(response)
      console.log(providers);
    }
    initProviders();
  }, []);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!

  return (
    <section className="signin">
      <div className="mb-5 text-2xl font-inter blue_gradient">Sign In</div>
      {providers && Object.values(providers).map((provider) => (
          <button className="signin_btn" key={provider.id} onClick={() => signIn(provider.id)}>
             <Image src={`/images/providers/${provider.id}.svg`} width={25} height={25} alt={provider.name} />
             <p className="ml-4 text-md">Continue with {provider.name}</p>
          </button>
      ))}
    </section>
  )
}