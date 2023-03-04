import React, { useEffect, useState, componentDidMount } from 'react';

import './App.scss';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';

export default function App() {

  const [posts, setPosts] = useState({});
  const [subreddits, setSubreddits] = useState({});

  let i = 0;
  useEffect(() => {
    console.log(i++);
    const fetchPopularPosts = async () => {
      const url = `https://www.reddit.com/r/popular.json`;

      let requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const response = await fetch(url, requestOptions);
      const jsondata = await response.json();
      
      return jsondata;
    }

    const fetchSubreddit = async (name) => {
      const url = `https://www.reddit.com/r/${name}/about.json`;

      let requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const response = await fetch(url, requestOptions);
      const jsondata = await response.json();
      
      return jsondata;
    }

    console.log(fetchPopularPosts());

    fetchPopularPosts().then((jsondata) => {
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
        return fetchSubreddit(name);
      })      
      
      Promise.all(promises).then((rawSubreddits) => {
        const popularSubreddits = {};

        rawSubreddits.forEach(rawSubreddit => {
          let urlData = rawSubreddit.data.community_icon || rawSubreddit.data.icon_img
          const removeUrlParams = (url) => {
            if(!url) {
              return url;
            }
          
            if(typeof(url) !== "string") {
              throw new Error("Input should be a string.");
            }
          
            return url.split("?")[0];
          }
          let imageUrl = removeUrlParams(urlData)
          popularSubreddits[rawSubreddit.data.display_name] = imageUrl
        })
        
        setSubreddits(popularSubreddits)
      });

      const feedPosts = {};
      jsondata.data.children.forEach(post => {
        feedPosts[post.data.id] = post.data
      });
      setPosts(feedPosts)
    }, [])
  }, []);
  // https://medium.com/@t93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
  // Double render: https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

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