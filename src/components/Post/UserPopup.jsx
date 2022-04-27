import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Avatar from '../Avatar/Avatar'
import Badge from './Badge'

export default class UserPopup extends Component {
  static propTypes = {}

  render() {
    return (
      <div className='user-popup'>
        <div className="container">
          <Avatar
            img_url={this.props.userAvatar}
            style={{
              width: "60px",
              height: "60px",
            }}
          />
          <Badge text={this.props.position} />
          <h3></h3>
        </div>
      </div>
    )
  }
}
