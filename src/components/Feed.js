import React from 'react';

import './Feed.scss';
import Post from './Feed/Post';

class Feed extends React.Component {
  render() {
    const posts = Object.keys(this.props.posts).map((postId) => {
      const postData = this.props.posts[postId]
      return <Post title={postData.title} key={postId} author={postData.author} comments={postData.num_comments} score={postData.score} media={postData.media_embed} image={postData.url_overridden_by_dest} />
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