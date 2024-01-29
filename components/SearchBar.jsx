'use client';

import { useState } from 'react'

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  function handler(e) {
    e.preventDefault();
  }
    
  return (
    <form className='relative w-full flex-center'>
        <input className='search_input peer' 
          type='text' 
          value={searchText} 
          placeholder='Search for questions already posted by other students' 
          required 
          onChange={handler}>
        </input>
    </form>
  )
}

export default SearchBar