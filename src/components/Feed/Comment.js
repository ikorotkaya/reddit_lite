import React from 'react';

import './Comment.scss';

class Comment extends React.Component {

  render() {
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
    const timestamp = timeDifference(currentSeconds, this.props.commentData.created);

    return (
      <div className='comment_container'>
        <div className='comment_container__name-time'>
          <p className='comment_container__username'>{this.props.commentData.author}</p>
          <p className='comment_container__timestamp'>{timestamp}</p>
        </div>

        <div className='comment_container__comment_text'>{this.props.commentData.body}</div>
      </div>
    )
  }
}

export default Comment