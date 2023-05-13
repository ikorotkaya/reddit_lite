import React from 'react';

import './Logo.scss';

class Logo extends React.Component {
	render() {
		return (
			<div className="logo" data-testid="logo">
				<img src="https://static.vecteezy.com/system/resources/thumbnails/008/385/783/small/reddit-social-media-design-icon-symbol-logo-illustration-free-vector.jpg" alt="reddit-icon" className="logo__icon"></img>
				<h3 className='logo__name'>Reddit<span>Lite</span></h3>

			</div>
		);
	}
}

export default Logo;