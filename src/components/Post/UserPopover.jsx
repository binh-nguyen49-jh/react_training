import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { POSITIONS } from '../../config/constants';
import Avatar from '../Avatar/Avatar';
import Badge from '../Badge/Badge';

export default class UserPopover extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  render() {
    const { user, style } = this.props;
    return (
      <div className='userPopover' style={style}>
        <div className='container'>
          <Avatar imgUrl={user.avatar} />
          <h3 className='userName'>{user.name}</h3>
          <div className='badgeList'>
            {user.position.map((position, idx) => (
              <Badge
                key={idx}
                text={position}
                style={{
                  backgroundColor: `${POSITIONS[position].color}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
