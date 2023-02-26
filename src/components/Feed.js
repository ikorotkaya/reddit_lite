import React from 'react';

import './Feed.scss';
import Post from './Feed/Post';

class Feed extends React.Component {


  render() {
    return (
      <section className="feed">
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