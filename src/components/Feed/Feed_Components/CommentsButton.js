import React from 'react';
import PropTypes from 'prop-types';


import './CommentsButton.scss';

export default function Post(props) {

	const handleEvent = () => {
		props.toggleComments();
	};

	return (
		<button type='button' className='action-button' onClick={handleEvent}>
			<svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className="icon-action" height="1em" width="1em" xmlns="https://www.w3.org/2000/svg"><path d="M18 7c.542 0 1 .458 1 1v7c0 .542-.458 1-1 1h-8.829l-.171.171v-.171h-3c-.542 0-1-.458-1-1v-7c0-.542.458-1 1-1h12m0-2h-12c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3v-7c0-1.65-1.35-3-3-3z"></path></svg>
		</button>
	);
}

Post.propTypes = {
	toggleComments: PropTypes.string.isRequired,
};