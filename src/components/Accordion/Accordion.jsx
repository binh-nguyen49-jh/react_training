import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import './Accordion.scss';

function Accordion({ children, maxHeight }) {
  const [showFull, setShowFull] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const contentRef = React.useRef(null);

  useEffect(() => {
    // if content is too short, hide accordionBtn
    if (contentRef.current.offsetHeight < parseInt(maxHeight)) {
      setShowBtn(false);
    }
  }, []);

  return (
    <div className='accordion'>
      <div
        className='accordionBody'
        ref={contentRef}
        style={{
          maxHeight: showFull ? 'none' : maxHeight,
        }}
        onClick={() => setShowFull(true)}>
        {children}
      </div>
      {showBtn && (
        <button className='accordionBtn' onClick={() => setShowFull(!showFull)}>
          {showFull ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}

Accordion.propTypes = {
  children: PropTypes.node,
  maxHeight: PropTypes.string,
};

export default React.memo(Accordion);
