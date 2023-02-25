import React from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';

class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <Feed />
        <Sidebar />
      </div>
    )
  }
}

export default App