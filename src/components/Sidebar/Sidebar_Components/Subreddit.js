import React from 'react';

import './Subreddit.scss';

export default function Subreddit(props) {

	const {changeSubreddit, currentSubredditName} = props;

	function handleSubredditClick(e) {
		e.preventDefault();
		changeSubreddit(props.name);
	}

	function cssClassName() {
		if (currentSubredditName === props.name) {
			return 'subreddit-button subreddit-button--active'; 
		} else {
			return 'subreddit-button';
		}
	}

	return (
		<button className={cssClassName()} type="button" onClick={handleSubredditClick} >
			<img src={props.icon} alt="Text" className="subreddit-icon" />
			{props.name}
		</button>
	);
}