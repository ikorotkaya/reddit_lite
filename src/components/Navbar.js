import React from 'react';

import './Navbar.css';
import Logo from './Navbar/Logo';
import Search from './Navbar/Search'

class Navbar extends React.Component {

  render() {
    return (
      <navbar class="navbar">

        <Logo />
        <Search />

      </navbar >
    )
  }
}

export default Navbar