import React from 'react';
import PropTypes from 'prop-types';

import './CommentsFeed.scss';
import Comment from './Comment';
import imageSrc from '../../images/spinning_image.gif';

class CommentsFeed extends React.Component {
	render() {
		const comments = Object.keys(this.props.comments).map((commentBody) => {
			const commentData = this.props.comments[commentBody];
			return <Comment commentData={commentData} key={commentBody} />;
		});

		const isSpinnerVisible = () => {
			return !this.props.commentsLoaded;
		};

		const isLoadMoreButtonVisible = () => {
			return this.props.commentsLoaded && this.props.moreCommentIds.length > 0;
		};

		return (
			<div className="comments-feed_container">
				{comments}
				{isSpinnerVisible() && (
					<img src={imageSrc} alt="spinner" className="spinner"></img>
				)}
				{isLoadMoreButtonVisible() && (
					<button
						type="button"
						onClick={this.props.loadMoreComments}
						className="load-more"
					>
						Load {this.props.moreCommentIds.length} more
					</button>
				)}
			</div>
		);
	}
}

export default CommentsFeed;

CommentsFeed.propTypes = {
	comments: PropTypes.string.isRequired,
	commentsLoaded: PropTypes.string.isRequired,
	moreCommentIds: PropTypes.string.isRequired,
	loadMoreComments: PropTypes.string.isRequired,
};
