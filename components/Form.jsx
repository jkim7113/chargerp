import Link from 'next/link'
import React from 'react'

const Form = ({ type, post, setPost, submitting, handler }) => {
  return (
    <section className='w-full max-width-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} a question</span>
      </h1>
      <form className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' onSubmit={handler}>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Title
          </span>

          <input className='form_input' type='text' value={post.title} placeholder='e.g.  Why does Nitrate (NO3) have a charge of -1?' onChange={(e) => setPost({...post, title: e.target.value})} />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Details
          </span>

          <textarea className='form_textarea' value={post.body} placeholder="Please be as specific as possible as if you're asking this question to a stranger." onChange={(e) => setPost({...post, body: e.target.value})}></textarea>
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Subject
          </span>

          <input className='form_input' type='text' value={post.tag} placeholder='e.g.  Algebra II' onChange={(e) => setPost({...post, tag: e.target.value})} />
        </label>
        <div className='flex-end mx-3 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>Cancel</Link>
          <button className='px-5 py-1.5 text-sm bg-centennial rounded-full text-white' type='submit' disabled={submitting}>Submit</button>
        </div>
      </form>
    </section>
  )
}

export default Form