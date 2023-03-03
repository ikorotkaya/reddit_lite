import React, { useState } from 'react';

import './PostDetails.scss';
import PostDetailsComments from './PostDetailsComments'
import CommentsFeed from './CommentsFeed'

export default function PostDetails(props) {
  const [comments, setComments] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [moreCommentIds, setMoreCommentIds] = useState([])

  const { postData } = props;
  const createdData = props.postData.created;
  const permalinkData = props.postData.permalink;


  const toggleComments = () => {
    setCommentsVisible(!commentsVisible)

    const fetchComments = async () => {
      const url = `http://www.reddit.com${permalinkData}.json`;

      let requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const response = await fetch(url, requestOptions);
      const jsondata = await response.json();
      return jsondata
    }

    fetchComments().then((jsondata) => {
      const rawCommentsData = jsondata[1]

      const postComments = {}

      rawCommentsData.data.children.filter(item => item.kind !== 'more').forEach((comment) => {
        postComments[comment.data.body] = comment.data
      })
      // console.log(postComments)
      setComments(postComments)
      const moreComments = rawCommentsData.data.children.find(item => item.kind === 'more');
      const commentIds = moreComments.data.children;
      setMoreCommentIds(commentIds)
    }, [])


    // if (commentsVisible) {
    //   setCommentsVisible(false)
    // } else {
    //   setCommentsVisible(true)
    // }
  }

  const loadMoreComments = () => {
    const tenMoreIds = moreCommentIds.splice(0, 10)

    const newCommentsPromises = tenMoreIds.map(id => {
      const url = `http://www.reddit.com${permalinkData}${id}.json`;
      let requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      return fetch(url, requestOptions)
    })

    setMoreCommentIds([...moreCommentIds])
  }


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
      <div className='post-details__details'>
        <div className='post-details__username'>{postData.author}</div>
        <div className='post-details__time'>{timestamp}</div>
        <PostDetailsComments postData={postData} onClick={toggleComments} toggleComments={toggleComments} />
      </div>
      {commentsVisible && <div className='post-details__comments-feed'>
        <CommentsFeed comments={comments} onClick={loadMoreComments} moreCommentIds={moreCommentIds} loadMoreComments={loadMoreComments} />
      </div>}
    </div>
  )
}

