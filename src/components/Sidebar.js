import React from 'react';

import './Sidebar.scss';
import Subreddit from './Sidebar/Subreddit';

class Sidebar extends React.Component {

  render() {
    return (
      <section className="sidebar">
        <h1 className='sidebar__headline'>Subreddits</h1>

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