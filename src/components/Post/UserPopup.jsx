import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';
import Badge from './Badge';

export default class UserPopup extends Component {
  static propTypes = {
    userAvatar: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  };

  render() {
    const { userAvatar, position } = this.props;
    return (
      <div className='user-popup'>
        <div className='container'>
          <Avatar
            imgUrl={userAvatar}
            style={{
              width: '60px',
              height: '60px',
            }}
          />
          <Badge text={position} />
          <h3></h3>
        </div>
      </div>
    );
  }
}
