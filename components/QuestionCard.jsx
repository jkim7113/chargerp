'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const QuestionCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image className='rounded-full object-contain' src={post.creator.image} alt="creator_profile_image" width={40} height={40} />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
          </div>
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.title}</p>
      <p className='font inter text-sm text-gray-600'>{post.body}</p>
    </div>
  )
}

export default QuestionCard