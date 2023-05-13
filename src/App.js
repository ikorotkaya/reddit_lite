import React, { useEffect, useState, useRef } from 'react';

import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Feed from './components/Feed/Feed';
import Sidebar from './components/Sidebar/Sidebar';
import PageLoader from '../src/components/PageLoader';
import FeedLoader from './components/Feed/Feed_Components/FeedLoader';

import fetchSubreddit from './modules/fetchSubreddit';

// give components better names
export default function App() {

	const [posts, setPosts] = useState({});
	const [subreddits, setSubreddits] = useState({});
	const [searchTerm, setSearchTerm] = useState('');
	const [subredditName, setSubredditName] = useState('popular');
	const [nextPageId, setNextPageId] = useState('');
	const [postsBeingLoaded, setPostsBeingLoaded] = useState(false);
	const [pageLoader, setPageLoader] = useState(true);

	const initializedRef = useRef(false);
	const loadingPosts = useRef(false);

	const loadSubreddits = (newSubreddits) => {
		const promises = newSubreddits.map(name => {
			return fetchSubreddit(name);
		});
  
		Promise.all(promises).then((rawSubreddits) => {
			const popularSubreddits = {};
  
			rawSubreddits.forEach(rawSubreddit => {
				let urlData = rawSubreddit.data.community_icon || rawSubreddit.data.icon_img;
				const removeUrlParams = (url) => {
					if (!url) {
						return url;
					}
  
					if (typeof (url) !== 'string') {
						throw new Error('Input should be a string.');
					}
  
					return url.split('?')[0];
				};
				let imageUrl = removeUrlParams(urlData);
				popularSubreddits[rawSubreddit.data.display_name] = imageUrl;
			});
  
			const allSubreddits = { ...subreddits, ...popularSubreddits };
			setSubreddits(allSubreddits);
  
			setPageLoader(false);
		});
	};

	const loadPosts = (subredditName) => {
		loadingPosts.current = true;
		setPostsBeingLoaded(true);
  
		fetchPosts(subredditName).then((jsondata) => {
			const feedPosts = {};
			jsondata.data.children.forEach(post => {
				feedPosts[post.data.id] = post.data;
			});
  
			const nextPage = jsondata.data.after;
  
			setNextPageId(nextPage);
			setPosts({ ...posts, ...feedPosts });
  
			loadingPosts.current = false;
  
			setPostsBeingLoaded(false);
  
			let newSubredditNames = [];
			jsondata.data.children.forEach(post => {
				if (!subreddits[post.data.subreddit]) {
					newSubredditNames.push(post.data.subreddit);
				}
			});
  
			loadSubreddits(newSubredditNames);
		});
  
	};

	const fetchPosts = async (subredditName) => {
		let url = '';
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

		console.log('--> jsondata: ', jsondata);
  
		return jsondata;
	};

	useEffect(() => {
		if (initializedRef.current) return;
		initializedRef.current = true;
		setPostsBeingLoaded(true);

		fetchPosts(subredditName).then((jsondata) => {

			const popularSubreddits = {};
			jsondata.data.children.forEach(post => {
				popularSubreddits[post.data.subreddit] = null;
			});

			const subredditNames = Object.keys(popularSubreddits);

			loadSubreddits(subredditNames);

			const feedPosts = {};
			jsondata.data.children.forEach(post => {
				feedPosts[post.data.id] = post.data;
			});

			setPosts(feedPosts);

			setPostsBeingLoaded(false);
		}, []);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (loadingPosts.current) return;
			if (!nextPageId) return;

			const windowHeight = window.innerHeight;
			const bodyHeight = document.querySelector('body').scrollHeight;
			const currentScrollHeight = window.scrollY;

			if ((bodyHeight - currentScrollHeight) <= windowHeight) {
				loadPosts(subredditName);
			}
		};

		window.addEventListener('scroll', handleScroll);

		// https://codingbeautydev.com/blog/react-scroll-event/

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [nextPageId]);

	// Double render: https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

	useEffect(() => {
		loadPosts(subredditName);
	}, [subredditName]);

	function updateSearchTerm(text) {
		setSearchTerm(text);
	}

	function changeSubreddit(subreddit) {
		setSubredditName(subreddit);
	}

	const isSpinnerVisible = () => {
		return postsBeingLoaded;
	};

	// https://medium.com/@t93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad

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
	);
}
