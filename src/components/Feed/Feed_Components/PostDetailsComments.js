import React from 'react';
import PropTypes from 'prop-types';

import './PostDetailsComments.scss';
import CommentsButton from './CommentsButton';

export default function PostDetailsComments(props) {
	const { postData, toggleComments } = props;

	return (
		<div className="comments_container">
			<CommentsButton toggleComments={toggleComments} />
			<p className="comments_container__amount">{postData.num_comments}</p>
		</div>
	);
}

PostDetailsComments.propTypes = {
	postData: PropTypes.string.isRequired,
	toggleComments: PropTypes.string.isRequired,
};
