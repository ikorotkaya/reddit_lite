import React, { useEffect, useState } from 'react';

import './App.scss';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';

export default function App() {

  const [posts, setPosts] = useState({});
  const [subreddits, setSubreddits] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [subredditName, setSubredditName] = useState('popular')

  const fetchPosts = async (subredditName) => {
    const url = `https://www.reddit.com/r/${subredditName}.json`;

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = await fetch(url, requestOptions);
    const jsondata = await response.json();

    return jsondata;
  }

  const loadPosts = (subredditName) => {
    fetchPosts(subredditName).then((jsondata) => {
      const feedPosts = {};
      jsondata.data.children.forEach(post => {
        feedPosts[post.data.id] = post.data
      });
      setPosts(feedPosts)
    })
  }

  useEffect(() => {

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

    fetchPosts(subredditName).then((jsondata) => {
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
            if (!url) {
              return url;
            }

            if (typeof (url) !== "string") {
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
  
  useEffect(() => {
    loadPosts(subredditName)
  }, [subredditName])

  function updateSearchTerm(text) {
    setSearchTerm(text)
  }

  function changeSubreddit(subreddit) {
    setSubredditName(subreddit)
  }

  // https://medium.com/@t93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
  // Double render: https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

  return (
    <div className='container'>
      <Navbar updateSearchTerm={updateSearchTerm} />

      <div className="container__feed-sidebar">
        <Feed posts={posts} searchTerm={searchTerm} />
        <Sidebar subreddits={subreddits} changeSubreddit={changeSubreddit} />
      </div>

    </div>
  )
}