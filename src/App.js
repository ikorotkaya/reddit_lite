import React from 'react';

import './App.scss';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';

class App extends React.Component {

  async componentDidMount() {
    const url = `https://www.reddit.com/r/popular.json`;

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = await fetch(url, requestOptions);
    const jsondata = await response.json();
    console.log(jsondata)
  }

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