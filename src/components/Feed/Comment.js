import React from 'react';

import './Comment.scss';

class Comment extends React.Component {

  render() {
    return (
      <div className='comment_container'>
        <h3 className='comment_container__username'>Username</h3>
        <p className='comment_container__timestamp'>Hours ago</p>
        <div className='comment_container__comment_text'>Text</div>
      </div>
    )
  }
}

export default Comment