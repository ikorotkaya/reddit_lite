/* eslint-disable react/prop-types */
import React from 'react';

import './Feed.scss';
import Post from '../Feed/Feed_Components/Post';

class Feed extends React.Component {
	render() {
		const posts = Object.keys(this.props.posts).filter(postId => {
			const postTitle = this.props.posts[postId].title;
			// convert postTitle to lowercase
			// convert searchTerm to lowercase
			// check if postTitle includes searchTerm
			// return true or false
			return postTitle.toLowerCase().includes(this.props.searchTerm.toLowerCase());

		}).map((postId) => {
			const postData = this.props.posts[postId];
			return <Post postData={postData} key={postId} />;
		});

		return (
			<section className="feed" data-testid="feed">
				<div className="feed__posts">
					{posts}
				</div>

			</section>
		);
	}
}

export default Feed;