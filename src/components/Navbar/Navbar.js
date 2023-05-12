import React from 'react';

import './Navbar.css';
import Logo from './Navbar_Components/Logo';
import Search from './Navbar_Components/Search';

class Navbar extends React.Component {

	render() {
		return (
			<div className="container__navbar">
				<Logo />
				<Search updateSearchTerm={this.props.updateSearchTerm} />
			</div >
		);
	}
}

export default Navbar;