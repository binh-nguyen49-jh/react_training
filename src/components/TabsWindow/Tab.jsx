import React from 'react';
import { PropTypes } from 'prop-types';

function Tab({ id, children }) {
  return (
    <div id={id} className='tab'>
      {children}
    </div>
  );
}
Tab.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default Tab;
