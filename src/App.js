import React from 'react';

import './App.scss';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';

class App extends React.Component {

  render() {
    return (
      <div className='container'>
        <Navbar />

        <div className="container__feed-sidebar">
          <Feed />
          <Sidebar />
        </div>
        
      </div>
    )
  }
}

export default App