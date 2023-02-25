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

        <div class="container">
          <Feed />
          <Sidebar />
        </div>
        
      </div>
    )
  }
}

export default App