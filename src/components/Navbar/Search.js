import React, { useState } from 'react';

import './Search.scss';

export default function Search(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const {updateSearchTerm} = props;

  function handleButtonClick(e) {
    e.preventDefault()
    updateSearchTerm(searchTerm);
  }

  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <form className="form">
      <input type="search" id="query" className='form__search-term' name="q" placeholder="Search" onChange={handleInput} required />
      <button className='form__search-button' onClick={handleButtonClick}>
        <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="https://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </form>
  )
}
