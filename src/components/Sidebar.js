import React from 'react';

import './Sidebar.scss';
import Subreddit from './Sidebar/Subreddit';

class Sidebar extends React.Component {
  render() {

    const subreddits = Object.keys(this.props.subreddits).map((subredditName) => {
      const subredditIcon = this.props.subreddits[subredditName]
      return <Subreddit icon={subredditIcon} name={subredditName} key={subredditName} changeSubreddit={this.props.changeSubreddit} />
    });
    return (
      <section className="sidebar">
        <h2 className='sidebar__headline'>Subreddits</h2>

        <div className="sidebar__subreddit">
          {subreddits}
        </div>

      </section>
    )
  }
}

export default Sidebar