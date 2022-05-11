import React from 'react';
import PropTypes from 'prop-types';
import { MODAL_POSITION_STYLES } from '../../../config/constants';

export default class Popover extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onMouseOverPopover: PropTypes.func,
    onMouseOutPopover: PropTypes.func,
    style: PropTypes.object,
    position: PropTypes.oneOf(Object.keys(MODAL_POSITION_STYLES)),
    space: PropTypes.string,
  };

  static defaultProps = {
    position: 'top-left',
    space: '10px',
  };

  render() {
    const {
      children,
      onMouseOverPopover,
      onMouseOutPopover,
      style,
      position,
      space,
    } = this.props;
    const positionStyle = MODAL_POSITION_STYLES[position]
      ? MODAL_POSITION_STYLES[position](space)
      : {};

    return (
      <div
        className='modal popover'
        style={{
          ...positionStyle,
          ...style,
        }}
        onMouseOver={onMouseOverPopover}
        onMouseEnter={onMouseOverPopover}
        onMouseOut={onMouseOutPopover}>
        {children}
      </div>
    );
  }
}
