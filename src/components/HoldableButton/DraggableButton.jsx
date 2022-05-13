import './DraggableButton.scss';
import React, { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';

function DraggableButton({ text, className, style, ...props }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const onDragStart = (event) => {
      const startPosition =
        event.clientX - buttonRef.current.getBoundingClientRect().left;
      props.onDragStart(event);
      const onDragging = (event) => {
        props.onDragging(event, {
          target: buttonRef.current,
          startPosition,
        });
      };
      const onDragEnd = (event) => {
        props.onDragEnd(event);
        window.removeEventListener('mousemove', onDragging);
        window.removeEventListener('mouseup', onDragEnd);
      };
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
    };

    if (buttonRef.current) {
      buttonRef.current.addEventListener('mousedown', onDragStart);
    }
  }, []);

  return (
    <div ref={buttonRef} className={`draggableBtn ${className}`} style={style}>
      {text}
    </div>
  );
}

DraggableButton.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragging: PropTypes.func,
};

DraggableButton.defaultProps = {
  text: '',
  onDragStart: () => {},
  onDragEnd: () => {},
  onDragging: () => {},
};

export default React.memo(DraggableButton);
