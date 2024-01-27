'use client';

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'

function TagInput({ post, setPost }) {
  const subjects = ["Algebra I", "Algebra II", "Biology", "Business", "Calculus", "Chemistry", "Computer Science A", 
  "Computer Science Principles", "Discrete Math", "English", "European History", "French", "Geometry", "German", 
  "Health", "Human Geography", "Macroeconomics", "Personal Finance", "Precalculus", "Physics", "Psychology", "Spanish", 
  "Statistics", "U.S. Government", "U.S. History", "World History"];

  const [tag, setTag] = useState('');
  const [selected, setSelected] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const inputRef = useRef('');

  useEffect(() => {
    setSelected(post.tag);
  }, []);

  useEffect(() => {
    if (tag.length < 2) return setRecommendations([]);
    const filteredSubjects = subjects.filter((subject) => {
      return subject.toLowerCase().indexOf(tag.toLowerCase()) !== -1;
    });
    setRecommendations(filteredSubjects);
  }, [tag]);

  function handleAdd(e){
    //toggler
    if (post?.tag.includes(e.target.innerText)) return;
    setPost({...post, tag: [...post.tag, e.target.innerText]});
    setSelected([...selected, e.target.innerText]);
    setRecommendations([]);
    inputRef.current.value = "";
  }

  function handleDelete(e){
    const newTag = post?.tag.filter(t => { return t !== e.target.innerText; });
    setPost({...post, tag: newTag});
    const newSelected = selected.filter(s => { return s !== e.target.innerText; });
    setSelected(newSelected);
  }

  return (
    <section className='w-full relative'>
     <input className='form_input' type='text' placeholder='e.g.  Algebra II' ref={inputRef} onChange={(e) => setTag(e.target.value)} />
     <div className='absolute w-full rounded-lg backdrop-blur-xl bg-gray-100/95'>
        {
          recommendations.map((recommendation) => (
            <div className='w-full px-3 py-2 rounded-lg text-md text-gray-600 hover:text-blue-600 hover:bg-gray-200' onClick={handleAdd} key={recommendation}>{recommendation}</div>
          ))
        }
     </div>
     <div className='w-full mt-4'>
        {
          selected.map((s) => (
            <span className='subject_selected' onClick={handleDelete} key={s}>{s}</span>
          ))
        }
     </div>
    </section>
  )
}

const Form = ({ title, post, setPost, submitting, handler }) => {
  return (
    <section className='w-full max-width-full flex-start flex-col mb-20'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{title}</span>
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
          <TagInput post={post} setPost={setPost}/>
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