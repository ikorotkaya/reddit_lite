import React from 'react';

import './PostDetailsComments.scss';
import CommentsButton from './CommentsButton'

export default function PostDetailsComments(props) {

  const {commentsNumber} = props;

  return (
    <div className='comments_container'>
      <CommentsButton />
      <p className='comments_container__amount'>{commentsNumber}</p>
    </div>
  )
}





