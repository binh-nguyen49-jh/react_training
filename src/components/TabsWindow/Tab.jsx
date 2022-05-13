import React from 'react';
import { PropTypes } from 'prop-types';

function Tab({ id, children, className }) {
  return (
    <div id={id} className={`tab ${className}`}>
      {children}
    </div>
  );
}
Tab.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

Tab.defaultProps = {
  label: '',
  children: null,
  className: '',
};

export default Tab;
