import React, { useEffect, useState } from 'react';

import './App.scss';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';

export default function App() {

  const [posts, setPosts] = useState({});
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

      const subredditNames = Object.keys(popularSubreddits);
      // console.log(subredditNames)

      const promises = subredditNames.map(name => {
        let requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };
        const url = `http://www.reddit.com/r/${name}/about.json`;

        return fetch(url, requestOptions)

      })

      Promise.all(promises).then((responses) => {
        Promise.all(responses.map(response => response.json())).then(rawSubreddits => {
          const popularSubreddits = {};
          rawSubreddits.forEach(rawSubreddit => {
            let urlData = rawSubreddit.data.community_icon || rawSubreddit.data.icon_img
            const removeUrlParams = (url) => {
              const urlObj = new URL(url);

              urlObj.search = '';
              urlObj.hash = '';

              return urlObj.toString();
            }
            let imageUrl = removeUrlParams(urlData)
            popularSubreddits[rawSubreddit.data.display_name] = imageUrl
          })
          setSubreddits(popularSubreddits)
        })
      });

      const feedPosts = {};
      jsondata.data.children.forEach(post => {
        feedPosts[post.data.id] = post.data
      });
      setPosts(feedPosts)
    })
  }, [])

  return (
    <div className='container'>
      <Navbar />

      <div className="container__feed-sidebar">
        <Feed posts={posts} />
        <Sidebar subreddits={subreddits} />
      </div>

    </div>
  )
}