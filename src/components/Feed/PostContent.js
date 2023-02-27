import React from 'react';

import './PostContent.scss';

class PostContent extends React.Component {


  render() {
    return (
      <div className="post-content">
        <h2 className='post-content__title'>{this.props.title}</h2>
        <img src={this.props.image} alt="" className="post-content__image"></img>
      </div>
    )
  }
}

export default PostContent