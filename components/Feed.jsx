'use client';

import { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard';

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {
        data.map((post) => (
          <QuestionCard key={post._id} post={post} handleTagClick={handleTagClick}/>
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  function handler(e) {
    e.preventDefault();
  }

  function handleTagClick(tagName) {
    setSearchText(tagName);

  };

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/questions');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, []);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input className='search_input peer' 
          type='text' v
          alue={searchText} 
          placeholder='Search for questions already posted by other students' 
          required 
          onChange={handler}>
        </input>
      </form>
      <CardList data={posts} handleTagClick={handleTagClick}/>
    </section>
  )
}

export default Feed