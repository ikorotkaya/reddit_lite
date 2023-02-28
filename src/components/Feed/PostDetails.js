import React from 'react';

import './PostDetails.scss';
import PostDetailsComments from './PostDetailsComments'

class PostDetails extends React.Component {


  render() {
    const createdData = this.props.postData.created;
    const d = new Date();
    d.setTime(createdData);
    const timestamp = d.toString().slice(16, 24);

    return (
      <div className="post-details">
        <div className='post-details__username'>{this.props.postData.author}</div>
        <div className='post-details__time'>{timestamp}</div>
        <PostDetailsComments comments={this.props.postData.num_comments} />
      </div>
    )
  }
}

export default PostDetails