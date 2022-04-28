import React from 'react';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    position: PropTypes.oneOf(['top-left', 'bottom-left', 'top-right', 'bottom-right']),
    space: PropTypes.string,
  };

  static defaultProps = {
    position: 'top-left',
    space: '10px',
  };

  static positionStyles = {
    'top-left': (space) => ({
      top: '0',
      left: '0',
      transform: 'translate(0, -100%)',
      paddingBottom: space,
    }),
    'top-right': (space) => ({
      top: '0',
      right: '0',
      transform: 'translate(0, -100%)',
      paddingBottom: space,
    }),
    'bottom-left': (space) => ({
      bottom: '0',
      left: '0',
      transform: 'translate(0, 100%)',
      paddingTop: space,
    }),
    'bottom-right': (space) => ({
      bottom: '0',
      right: '0',
      transform: 'translate(0, 100%)',
      paddingTop: space,
    }),
  };

  render() {
    const {
      children,
      style,
      position,
      space
    } = this.props;
    const positionStyle = Modal.positionStyles[position]
      ? Modal.positionStyles[position](space)
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
        }}
      >
        {children}
      </div>
    );
  }
}
