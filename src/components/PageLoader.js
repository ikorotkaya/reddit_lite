import React from "react";
import "./PageLoader.scss"
import imageSrc from './images/spinning_image.gif'

class PageLoader extends React.Component {
  render() {
    return (
      <div className="pade-loader">
        <img src={imageSrc} alt="spinner" className="page-loader__spinner" />
      </div>
    )
  }
}

export default PageLoader