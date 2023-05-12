import React from 'react';

import './PostContent.scss';

export default function PostContent(props) {
	const { postData } = props;

	function chooseMediaType(postData) {
		if (postData.media?.reddit_video) {
			return <video width="320" height="240" controls><source src={postData.media.reddit_video.scrubber_media_url} type="video/mp4" /></video>;
		}
		else if (postData.secure_media?.oembed) {
			return <img src={postData.secure_media.oembed.thumbnail_url} alt="" className="post-content__image" />;
		}
		else if (postData.url.endsWith('.png') || postData.url.endsWith('.jpg')) {
			return <img src={postData.url} alt="" className="post-content__image" />;
		}
		else if (!postData.is_self) {
			return <a href={postData.url}>{postData.url}</a>;
		}
		else if (postData.selftex) {
			return postData.selftext;
		}
		else if (postData.thumbnail !== 'self' && postData.thumbnail !== 'default') {
			return <img src={postData.thumbnail} alt="" className="post-content__image" />;
		}
		else {
			return;
		}
	}

	return (
		<div className="post-content">
			<h2 className='post-content__title'>{postData.title}</h2>
			{chooseMediaType(postData)}
		</div>
	);
}