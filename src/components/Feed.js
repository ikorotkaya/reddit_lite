import React from 'react';

import './Feed.css';
import Post from './Feed/Post';

class Feed extends React.Component {


  render() {
    return (
      <section class="feed">
        <h1>FEED</h1>

        <div class="feed__posts">
          <Post />
          <Post />
          <Post />
        </div>

      </section>
    )
  }
}

export default Feed