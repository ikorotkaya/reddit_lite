import React, { useEffect, useState } from 'react';

import './App.scss';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';

export default function App() {

  const [posts, setPosts] = useState();
  const [subreddits, setSubreddits] = useState({});

  useEffect(() => {

    const fetchData = async () => {
      const url = `http://www.reddit.com/r/popular.json`;

      let requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const response = await fetch(url, requestOptions);
      const jsondata = await response.json();
      return jsondata
    }

    fetchData().then((jsondata) => {
      // const popularSubreddits = jsondata.data.children.reduce((accumulator, post) => {
      //   accumulator[post.data.subreddit] = null;

      //   return accumulator; 
      // }, {});

      const popularSubreddits = {};
      jsondata.data.children.forEach(post => {
        popularSubreddits[post.data.subreddit] = null
      });

      console.log('Set subreddits')
      setSubreddits(popularSubreddits)
    })


  }, [])

  return (
    <div className='container'>
      <Navbar />

      <div className="container__feed-sidebar">
        <Feed />
        <Sidebar subreddits={subreddits} />
      </div>

    </div>
  )
}