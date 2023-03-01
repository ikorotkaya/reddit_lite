import React from 'react';

import './CommentsFeed.scss';
import Comment from './Comment';

class CommentsFeed extends React.Component {


  render() {
    console.log('Here we are: ' + this.props.comments)
    const comments = Object.keys(this.props.comments).map((commentBody) => {
      const commentData = this.props.comments[commentBody]
      return <Comment commentData={commentData} key={commentBody} />
    });

    return (
      <div className='comments-feed_container'>
        {comments}
      </div>
    )
  }
}

export default CommentsFeed