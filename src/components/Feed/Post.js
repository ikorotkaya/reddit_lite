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
          <Rating score={this.props.postData.score} />
        </div>

        <div className="post__container">
          <PostContent postData={this.props.postData}/>
          <PostDetails postData={this.props.postData}/>
        </div>
      </div>
    )
  }
}

export default Post