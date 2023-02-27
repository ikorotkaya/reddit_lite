import React from 'react';

import './PostContent.scss';

class PostContent extends React.Component {


  render() {
    return (
      <div className="post-content">
        <h2 className='post-content__title'>{this.props.postData.title}</h2>
        {this.props.postData.secure_media?.reddit_video ? <video width="320" height="240" controls><source src={this.props.postData.secure_media.reddit_video.scrubber_media_url} type="video/mp4"/></video> : <img src={this.props.postData.thumbnail} alt="" className="post-content__image"/> }
      </div>
    )
  }
}

export default PostContent