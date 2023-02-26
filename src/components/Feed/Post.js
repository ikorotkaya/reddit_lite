import React from 'react';

import './Post.scss';
import Rating from './Rating';
import PostContent from './PostContent';
import PostDetails from './PostDetails';

class Post extends React.Component {


  render() {
    return (
      <div className="post">
        <div className="post__rating">
          <Rating />
        </div>

        <div className="post__container">
          <PostContent />
          <PostDetails />
        </div>
      </div>
    )
  }
}

export default Post