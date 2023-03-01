import React from 'react';

import './CommentsFeed.scss';
import Comment from './Comment';

class CommentsFeed extends React.Component {

  // TODO: create "Load more" button and paginate comments
  render() {
    console.log('Here we are: ' + JSON.stringify(this.props.comments));

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