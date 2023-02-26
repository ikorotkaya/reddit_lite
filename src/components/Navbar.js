import React from 'react';

import './Navbar.css';
import Logo from './Navbar/Logo';
import Search from './Navbar/Search'

class Navbar extends React.Component {

  render() {
    return (
      <div className="container__navbar">

        <Logo />
        <Search />

      </div >
    )
  }
}

export default Navbar