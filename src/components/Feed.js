import React from 'react';

import './Feed.css';
import Post from './Feed/Post';

class Feed extends React.Component {


  render() {
    return (
      <section className="feed">
        <h1>FEED</h1>

        <div className="feed__posts">
          <Post />
          <Post />
          <Post />
        </div>

      </section>
    )
  }
}

export default Feed