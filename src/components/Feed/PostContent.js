import React from 'react';

import './PostContent.scss';

class PostContent extends React.Component {


  render() {
    return (
      <div className="post-content">
        <h2 className='post-content__title'>Title</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvp_7wmMJzFr_atRtvsRTHiTweuMarz4S3aw&amp;usqp=CAU" alt="Text" class="post-content__image"></img>
      </div>
    )
  }
}

export default PostContent