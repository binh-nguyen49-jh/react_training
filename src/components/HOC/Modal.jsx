import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onMouseOverModal: PropTypes.func,
    onMouseOutModal: PropTypes.func,
  };

  render() {
    const { children, onMouseOverModal, onMouseOutModal, style } = this.props;

    return ReactDOM.createPortal(
      <div
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          ...style,
        }}
        onMouseOver={onMouseOverModal}
        onMouseEnter={onMouseOverModal}
        onMouseOut={onMouseOutModal}>
        {children}
      </div>,
      document.getElementById('root')
    );
  }
}
