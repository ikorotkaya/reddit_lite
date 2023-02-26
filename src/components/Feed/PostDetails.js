import React from 'react';

import './PostDetails.scss';
import PostDetailsComments from './PostDetailsComments'

class PostDetails extends React.Component {


  render() {
    return (
      <div className="post-details">
        <div className='post-details__username'>Username</div>
        <div className='post-details__time'>Time</div>
        <PostDetailsComments />
      </div>
    )
  }
}

export default PostDetails