import React from 'react';
import PropTypes from 'prop-types';

function RoleIcon({ role }) {
  return (
    <div
      className='roleIcon'
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        aspectRatio: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${role.color}`,
        color: '#fff',
      }}>
      <p style={{
        fontSize: '14px',
        fontWeight: '700',
        lineHeight: '14px',
      }}>{ role.icon }</p>
    </div>
  );
}

RoleIcon.propTypes = {
  role: PropTypes.object.isRequired,
};

export default React.memo(RoleIcon);