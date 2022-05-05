import React from 'react';
import PropTypes from 'prop-types';
import { MODAL_POSITION_STYLES } from '../../config/constants';

export default class Modal extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    position: PropTypes.oneOf(Object.keys(MODAL_POSITION_STYLES)),
    space: PropTypes.string,
  };

  static defaultProps = {
    position: 'top-left',
    space: '10px',
  };

  render() {
    const { children, style, position, space } = this.props;
    const positionStyle = MODAL_POSITION_STYLES[position]
      ? MODAL_POSITION_STYLES[position](space)
      : {};

    return (
      <div
        style={{
          position: 'absolute',
          zIndex: '10',
          width: 'fit-content',
          height: 'fit-content',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          ...positionStyle,
          ...style,
        }}>
        {children}
      </div>
    );
  }
}
