import React from 'react';

import './Sidebar.scss';
import Subreddit from './Sidebar/Subreddit';

class Sidebar extends React.Component {

  render() {
    return (
      <section className="sidebar">
        <h2 className='sidebar__headline'>Subreddits</h2>

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