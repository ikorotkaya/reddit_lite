import React from 'react';

import './PostDetails.scss';
import PostDetailsComments from './PostDetailsComments'

class PostDetails extends React.Component {


  render() {
    return (
      <div className="post-details">
        <div className='post-details__username'>{this.props.postData.author}</div>
        <div className='post-details__time'>Time</div>
        <PostDetailsComments comments={this.props.postData.num_comments}/>
      </div>
    )
  }
}

export default PostDetails