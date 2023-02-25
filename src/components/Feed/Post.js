import React from 'react';

import './Post.css';
import Rating from './Rating';
import PostContent from './PostContent';
import Comments from './Comments';

class Post extends React.Component {


  render() {
    return (
      <div className="post">
        <div className="post__rating">
          <Rating />
        </div>

        <div className="post__container">
          <PostContent />
          <Comments />
        </div>
      </div>
    )
  }
}

export default Post