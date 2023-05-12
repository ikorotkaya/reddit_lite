import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.scss';
import Subreddit from './Sidebar_Components/Subreddit';

class Sidebar extends React.Component {
	render() {
		const subreddits = Object.keys(this.props.subreddits).map(
			(subredditName) => {
				const subredditIcon = this.props.subreddits[subredditName];
				return (
					<Subreddit
						icon={subredditIcon}
						currentSubredditName={this.props.currentSubredditName}
						name={subredditName}
						key={subredditName}
						changeSubreddit={this.props.changeSubreddit}
					/>
				);
			}
		);
		return (
			<section className="sidebar">
				<h2 className="sidebar__headline">Subreddits</h2>

				<div className="sidebar__subreddit">{subreddits}</div>
			</section>
		);
	}
}

Sidebar.propTypes = {
	subreddits: PropTypes.string.isRequired,
	changeSubreddit: PropTypes.string.isRequired,
	currentSubredditName: PropTypes.string.isRequired,
};

export default Sidebar;
