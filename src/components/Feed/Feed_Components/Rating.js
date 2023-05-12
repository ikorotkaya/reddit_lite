import React from 'react';
import PropTypes from 'prop-types';

import './Rating.css';

class Rating extends React.Component {
	render() {
		return <div className="rating">{this.props.score}</div>;
	}
}

export default Rating;

Rating.propTypes = {
	score: PropTypes.string.isRequired,
};
