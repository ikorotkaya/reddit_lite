import React from 'react';

import './Navbar.css';
import Logo from './Navbar/Logo';
import Search from './Navbar/Search'

class Navbar extends React.Component {

  render() {
    return (
      <section class="navbar">
        <nav class="navbar">NAVBAR</nav>

        <div class="navbar_elements">
        <Logo />
        <Search />
        </div>

      </section >
    )
  }
}

export default Navbar