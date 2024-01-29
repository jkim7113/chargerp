import Image from 'next/image';
import { EditMenu } from './EditMenu';

const QuestionCard = ({ post, handleEdit, handleDelete }) => {
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
              key={t}
              className='font-inter mr-1 text-sm blue_gradient cursor-pointer'
            >
              #{t}
            </p>
          ))
        }
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.title}</p>
      <p className='font inter text-sm text-gray-600'>{post.body}</p>
      
      <EditMenu handleDelete={handleDelete} handleEdit={handleEdit} post={post}/>
    </div>
  )
}

export default QuestionCard