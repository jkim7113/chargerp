'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const QuestionCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname()
  const router = useRouter();

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
      <div className='w-full flex flex-wrap'>
        {
          post?.tag.map(t => (
            <p
              className='font-inter mr-1 text-sm blue_gradient cursor-pointer'
              onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
              #{t}
            </p>
          ))
        }
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.title}</p>
      <p className='font inter text-sm text-gray-600'>{post.body}</p>
      
      {session?.user.id == post.creator._id 
      && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer'
          onClick={handleEdit}>Edit</p>
          <p className='font-inter text-sm orange_gradient cursor-pointer'
          onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default QuestionCard