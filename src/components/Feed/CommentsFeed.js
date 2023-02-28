import React from 'react';

import './CommentsFeed.scss';
import Comment from './Comment';

class CommentsFeed extends React.Component {


  render() {
    return (
      <div className='comments_container'>
        <Comment />
        <Comment />
        <Comment />
      </div>
    )
  }
}

export default CommentsFeed