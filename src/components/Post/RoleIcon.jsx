import React from 'react';
import PropTypes from 'prop-types';

function RoleIcon({ role }) {
  return (
    <div
      className='roleIcon'
      style={{
        backgroundColor: `${role.color}`,
      }}>
      <p>{role.icon}</p>
    </div>
  );
}

RoleIcon.propTypes = {
  role: PropTypes.object.isRequired,
};

export default React.memo(RoleIcon);
