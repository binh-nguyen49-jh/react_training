import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';
import Badge from './Badge';

export default class UserPopover extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  render() {
    const { user, style } = this.props;
    return (
      <div
        className='userPopover'
        style={{
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          height: 'fit-content',
          width: '300px',
          padding: '20px',
          ...style,
        }}>
        <div
          className='container'
          style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr',
            gridTemplateRows: '1fr 1fr',
            columnGap: '10px',
            rowGap: '5px',
          }}>
          <Avatar
            imgUrl={user.avatar}
            style={{
              gridArea: '1 / 1 / 3 / 2',
              width: '60px',
              height: '60px',
            }}
          />
          <div
            style={{
              gridArea: '1 / 2 / 2 / 3',
            }}>
            <Badge text={user.position} />
          </div>
          <h3>{user.name}</h3>
        </div>
      </div>
    );
  }
}
