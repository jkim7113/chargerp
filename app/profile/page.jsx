'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Profile from '@components/Profile';

const page = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts(){
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
    }

    if(session?.user.id) fetchPosts();
  }, []);

  function handleEdit() {

  } 
  function handleDelete() {

  }
  
  return (
    <Profile 
        name="My Profile" 
        desc="Welcome to your personalized profile page@" 
        data={posts} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
    />
  )
}

export default page