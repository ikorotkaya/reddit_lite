import React from 'react';

import './PostContent.scss';

export default function PostContent(props) {
  // TODO: split into 4 components for VideoPost, CommentPost, ImagePost and ImageGalleryPost
  const { postData } = props;

  function chooseMediaType(postData) {
    if (postData.secure_media?.reddit_video) {
      return <video width="320" height="240" controls><source src={postData.secure_media.reddit_video.scrubber_media_url} type="video/mp4" /></video>
    } else {
      return <img src={postData.thumbnail} alt="" className="post-content__image" />
    }
  }

  return (
    <div className="post-content">
      <h2 className='post-content__title'>{postData.title}</h2>
      {chooseMediaType(postData)}
    </div>
  )
}