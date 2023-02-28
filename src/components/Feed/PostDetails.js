import React from 'react';

import './PostDetails.scss';
import PostDetailsComments from './PostDetailsComments'

class PostDetails extends React.Component {


  render() {
    const createdData = this.props.postData.created;

    // to show the exact time of the post
    // const d = new Date();
    // d.setTime(createdData);
    // const time = d.toString().slice(16, 24);

    function timeDifference(current, previous) {

      var secPerMinute = 60;
      var secPerHour = secPerMinute * 60;
      var secPerDay = secPerHour * 24;
      var secPerMonth = secPerDay * 30;
      var secPerYear = secPerDay * 365;

      var postTime = Math.abs(current - previous);

      if (postTime < secPerMinute) {
        return Math.round(postTime / 1000) + ' seconds ago';
      }

      else if (postTime < secPerHour) {
        return Math.round(postTime / secPerMinute) + ' minutes ago';
      }

      else if (postTime < secPerDay) {
        return Math.round(postTime / secPerHour) + ' hours ago';
      }

      else if (postTime < secPerMonth) {
        return 'approximately ' + Math.round(postTime / secPerDay) + ' days ago';
      }

      else if (postTime < secPerYear) {
        return 'approximately ' + Math.round(postTime / secPerMonth) + ' months ago';
      }

      else {
        return 'approximately ' + Math.round(postTime / secPerYear) + ' years ago';
      }
    }

    const currentSeconds = Date.now() / 1000;
    const timestamp = timeDifference(currentSeconds, createdData);

    return (
      <div className="post-details">
        <div className='post-details__username'>{this.props.postData.author}</div>
        <div className='post-details__time'>{timestamp}</div>
        <PostDetailsComments comments={this.props.postData.num_comments} />
      </div>
    )
  }
}

export default PostDetails