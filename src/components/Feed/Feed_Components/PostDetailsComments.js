import React from 'react';

import './PostDetailsComments.scss';
import CommentsButton from './CommentsButton';

export default function PostDetailsComments(props) {

	const {postData, toggleComments} = props;

	return (
		<div className='comments_container'>
			<CommentsButton toggleComments={toggleComments}/>
			<p className='comments_container__amount'>{postData.num_comments}</p>
		</div>
	);
}





