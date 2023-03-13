import React, { useEffect, useState, useRef } from 'react';

import './App.scss';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import PageLoader from './components/PageLoader'
import FeedLoader from './components/Feed/FeedLoader'

export default function App() {

  const [posts, setPosts] = useState({});
  const [subreddits, setSubreddits] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [subredditName, setSubredditName] = useState('popular');
  const [nextPageId, setNextPageId] = useState('');
  const [postsBeingLoaded, setPostsBeingLoaded] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);

  const initializedRef = useRef(false);
  const loadingPosts = useRef(false)

  const fetchPosts = async (subredditName) => {
    let url = ''
    if (nextPageId) {
      url = `https://www.reddit.com/r/${subredditName}.json?after=${nextPageId}`;
    } else {
      url = `https://www.reddit.com/r/${subredditName}.json`;
    }

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = await fetch(url, requestOptions);
    const jsondata = await response.json();

    return jsondata;
  }

  const loadPosts = (subredditName) => {
    loadingPosts.current = true;
    setPostsBeingLoaded(true)

    fetchPosts(subredditName).then((jsondata) => {
      const feedPosts = {};
      jsondata.data.children.forEach(post => {
        feedPosts[post.data.id] = post.data
      });

      const nextPage = jsondata.data.after

      setNextPageId(nextPage);
      setPosts({ ...posts, ...feedPosts });

      loadingPosts.current = false;

      setPostsBeingLoaded(false)
    })

    let newSubredditsNames = [];

    Object.values(posts).forEach(post => {
      if (Object.keys(subreddits).includes(post.subreddit)) {
        return
      } else {
        newSubredditsNames.push(post.subreddit)
      }
    });

  }

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    setPostsBeingLoaded(true)

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
        setPageLoader(false)
      });

      const feedPosts = {};
      jsondata.data.children.forEach(post => {
        feedPosts[post.data.id] = post.data
      });

      setPosts(feedPosts)

      setPostsBeingLoaded(false)
    }, [])
  }, []);

  // useEffect(() => {
  //   setPageLoader(!!postsBeingLoaded)
  // }, [postsBeingLoaded]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (loadingPosts.current) return;
      if (!nextPageId) return;

      const windowHeight = window.innerHeight;
      const bodyHeight = document.querySelector('body').scrollHeight;
      const currentScrollHeight = window.scrollY;

      if ((bodyHeight - currentScrollHeight) <= windowHeight) {
        loadPosts(subredditName)
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPageId]);

  useEffect(() => {
    loadPosts(subredditName)
  }, [subredditName])

  function updateSearchTerm(text) {
    setSearchTerm(text)
  }

  function changeSubreddit(subreddit) {
    setSubredditName(subreddit)
  }

  const isSpinnerVisible = () => {
    return postsBeingLoaded
  }



  // https://medium.com/@t93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
  // Double render: https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

  return (
    <div>
      {pageLoader && <PageLoader />}

      <div className='container'>
        <Navbar updateSearchTerm={updateSearchTerm} />
        <div className="container__feed-sidebar" >

          <div className='feed-sidebar__feed'>
            <Feed posts={posts} searchTerm={searchTerm} />
            {isSpinnerVisible() && <FeedLoader />}
          </div>

          <Sidebar subreddits={subreddits} changeSubreddit={changeSubreddit} currentSubredditName={subredditName} />
        </div>
      </div>
    </div>
  )
}