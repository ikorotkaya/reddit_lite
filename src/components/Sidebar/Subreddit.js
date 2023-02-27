import React from 'react';

import './Subreddit.css';

class Subreddit extends React.Component {

  render() {
    return (
      <button className='subreddit-button' type="button">
        <img src={this.props.icon} alt="Text" className="subreddit-icon"/>
        {this.props.name}
      </button>
    )
  }
}

export default Subreddit