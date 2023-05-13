import React from 'react';
import PropTypes from 'prop-types';

import './Comment.scss';
import timeDifference from '../../../modules/timeDifference';

class Comment extends React.Component {
	render() {
		const currentSeconds = Date.now() / 1000;
		const timestamp = timeDifference(currentSeconds, this.props.commentData.created);

		return (
			<div className='comment_container'>
				<div className='comment_container__name-time'>
					<p className='comment_container__username'>{this.props.commentData.author}</p>
					<p className='comment_container__timestamp'>{timestamp}</p>
				</div>

				<div className='comment_container__comment_text'>{this.props.commentData.body}</div>
			</div>
		);
	}
}

export default Comment;

Comment.propTypes = {
	commentData: PropTypes.string.isRequired
};
