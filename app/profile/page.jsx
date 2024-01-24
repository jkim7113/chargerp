'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const page = () => {
  const router = useRouter();
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

  function handleEdit(post) {
    router.push(`/questions/${post._id}/edit`);
  } 
  async function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you want to delete this question?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/questions/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  return (
    <Profile 
        name="My Profile" 
        desc="Welcome to your personalized profile page" 
        data={posts} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
    />
  )
}

export default page