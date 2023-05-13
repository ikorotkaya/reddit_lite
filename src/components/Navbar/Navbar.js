import React from 'react';
import PropTypes from 'prop-types';

import './Navbar.css';
import Logo from './Navbar_Components/Logo';
import Search from './Navbar_Components/Search';

class Navbar extends React.Component {
	render() {
		return (
			<div className="container__navbar" data-testid="navbar">
				<Logo />
				<Search updateSearchTerm={this.props.updateSearchTerm} />
			</div>
		);
	}
}

export default Navbar;

Navbar.propTypes = {
	updateSearchTerm: PropTypes.string.isRequired,
};
