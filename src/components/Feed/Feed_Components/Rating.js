import React from 'react';

import './Rating.css';

class Rating extends React.Component {
	render() {
		return (
			<div className="rating">
				{this.props.score}
			</div>
		);
	}
}

export default Rating;