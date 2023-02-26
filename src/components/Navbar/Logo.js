import React from 'react';

import './Logo.scss';

class Logo extends React.Component {


  render() {
    return (
      <div className="logo">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvp_7wmMJzFr_atRtvsRTHiTweuMarz4S3aw&usqp=CAU" alt="reddit-icon" className="logo__icon"></img>
        <h3 className='logo__name'>Reddit<span>Lite</span></h3>

      </div>
    )
  }
}

export default Logo