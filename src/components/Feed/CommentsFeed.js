import React from 'react';

import './CommentsFeed.scss';
import Comment from './Comment';

class CommentsFeed extends React.Component {

  // TODO: create "Load more" button and paginate comments
  render() {
    // console.log('Here we are: ' + JSON.stringify(this.props.comments));

    const comments = Object.keys(this.props.comments).map((commentBody) => {
      const commentData = this.props.comments[commentBody]
      return <Comment commentData={commentData} key={commentBody} />
    });

    const numberOfComments = this.props.moreCommentIds.length

    return (
      <div className='comments-feed_container'>
        {comments}
        <button type='button' onClick={this.props.loadMoreComments} className="load-more">Load {numberOfComments} more</button>
      </div>
    )
  }
}

export default CommentsFeed