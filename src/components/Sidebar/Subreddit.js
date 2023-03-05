import React from 'react';

import './Subreddit.css';

export default function Subreddit(props) {

  const {changeSubreddit} = props;

  function handleSubredditClick(e) {
    e.preventDefault()
    changeSubreddit(props.name)
  }

  return (
    <button className='subreddit-button' type="button" onClick={handleSubredditClick} >
      <img src={props.icon} alt="Text" className="subreddit-icon" />
      {props.name}
    </button>
  )
}