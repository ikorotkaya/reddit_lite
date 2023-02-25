import React from 'react';

import './Sidebar.css';
import Subreddit from './Sidebar/Subreddit';

class Sidebar extends React.Component {

  render() {
    return (
      <section className="sidebar">
        <h1>SIDEBAR</h1>

        <div className="sidebar__subreddit">
          <Subreddit />
          <Subreddit />
          <Subreddit />
        </div>

      </section>
    )
  }
}

export default Sidebar