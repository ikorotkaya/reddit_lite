import React from 'react';
import PropTypes from 'prop-types';
// Typechecking With PropTypes https://legacy.reactjs.org/docs/typechecking-with-proptypes.html

import './Subreddit.scss';

export default function Subreddit(props) {
	function handleSubredditClick(e) {
		e.preventDefault();
		props.changeSubreddit(props.name);
	}

	function cssClassName() {
		if (props.currentSubredditName === props.name) {
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

Subreddit.propTypes = {
	icon: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	changeSubreddit: PropTypes.string.isRequired,
	currentSubredditName: PropTypes.string.isRequired
};