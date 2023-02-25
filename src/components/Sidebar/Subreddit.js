import React from 'react';

import './Subreddit.css';

class Subreddit extends React.Component {

  render() {
    return (
      <button type="button">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvp_7wmMJzFr_atRtvsRTHiTweuMarz4S3aw&usqp=CAU" alt="Text" class="subreddit-icon"></img>
        Text
      </button>
    )
  }
}

export default Subreddit