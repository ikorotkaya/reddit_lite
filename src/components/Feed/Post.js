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
          <Rating score={this.props.score} />
        </div>

        <div className="post__container">
          <PostContent title={this.props.title} image={this.props.image}/>
          <PostDetails author={this.props.author} comments={this.props.comments}/>
        </div>
      </div>
    )
  }
}

export default Post