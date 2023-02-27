import React from 'react';

import './Feed.scss';
import Post from './Feed/Post';

class Feed extends React.Component {
  render() {
    const posts = Object.keys(this.props.posts).map((postId) => {
      const postData = this.props.posts[postId]
      return <Post postData={postData} key={postId} />
    });

    return (
      <section className="feed">
        <div className="feed__posts">
          {posts}
        </div>

      </section>
    )
  }
}

export default Feed