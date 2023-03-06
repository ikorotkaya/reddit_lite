import React from 'react';

import './CommentsFeed.scss';
import Comment from './Comment';

class CommentsFeed extends React.Component {

  render() {
    const comments = Object.keys(this.props.comments).map((commentBody) => {
      const commentData = this.props.comments[commentBody]
      return <Comment commentData={commentData} key={commentBody} />
    });

    return (
      <div className='comments-feed_container'>
        {comments}
        {this.props.commentsLoaded ? (this.props.moreCommentIds.length !==0 ? <button type='button' onClick={this.props.loadMoreComments} className="load-more">Load {this.props.moreCommentIds.length} more</button> : null ) : <img src={require('./spinning_image.gif')} alt="spinner" className="spinner"></img>}
      </div>
    )
  }
}

export default CommentsFeed