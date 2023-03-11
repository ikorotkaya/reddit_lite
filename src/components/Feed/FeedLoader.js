import React from "react";
import './FeedLoader.scss'

import imageSrc from '../images/spinning_image.gif'


class FeedLoader extends React.Component {
  render() {
    return (
      <div className="feed-loader">
        <img src={imageSrc} alt="spinner" className="feed-loader__spinner"/>
      </div>
    )
  }
}

export default FeedLoader 