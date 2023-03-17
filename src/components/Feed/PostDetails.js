import React, { useState } from 'react';

import './PostDetails.scss';
import PostDetailsComments from './PostDetailsComments'
import CommentsFeed from './CommentsFeed'

import timeDifference from '../../modules/timeDifference';

export default function PostDetails(props) {
  const [comments, setComments] = useState({});
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [moreCommentIds, setMoreCommentIds] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false)

  const { postData } = props;
  const createdData = props.postData.created;
  const permalinkData = props.postData.permalink;


  const toggleComments = () => {
    setCommentsVisible(!commentsVisible)

    const fetchComments = async () => {
      const url = `https://www.reddit.com${permalinkData}.json`;

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

      const commentIds = moreComments?.data?.children;

      if (commentIds) {
        setMoreCommentIds(commentIds)

      }

      setCommentsLoaded(!commentsLoaded)
    }, [])

    // if (commentsVisible) {
    //   setCommentsVisible(false)
    // } else {
    //   setCommentsVisible(true)
    // }
  }


  const loadMoreComments = () => {
    const tenMoreIds = moreCommentIds.splice(0, 10)

    const fetchComment = async (id) => {
      const url = `https://www.reddit.com${permalinkData}${id}.json`;

      let requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const response = await fetch(url, requestOptions);
      const jsondata = await response.json();

      return jsondata;
    }

    const newCommentsPromises = tenMoreIds.map(id => {
      return fetchComment(id)
    })

    Promise.all(newCommentsPromises).then(rawComments => {
      const postNewComments = {};

      rawComments.forEach(rawCommentData => {
        const newComment = rawCommentData[1];
        newComment.data.children.forEach((comment) => {
          postNewComments[comment.data.body] = comment.data
        })
      })

      setComments({ ...comments, ...postNewComments })
    })

    setMoreCommentIds([...moreCommentIds])
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
        <CommentsFeed comments={comments} commentsLoaded={commentsLoaded} onClick={loadMoreComments} moreCommentIds={moreCommentIds} loadMoreComments={loadMoreComments} />
      </div>}
    </div>
  )
}

