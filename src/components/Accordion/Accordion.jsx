import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import './Accordion.scss';
import { truncateText } from '../../utils/mathFuncs';

function Accordion({ children, maxHeight, maxWords }) {
  const [showFull, setShowFull] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const contentRef = React.useRef(null);

  useEffect(() => {
    // if content is too short, hide accordionBtn
    if (maxHeight && contentRef.current.offsetHeight < maxHeight) {
      setShowBtn(false);
    }
    if (maxWords) {
      const text = children.props.children;
      if (text === truncateText(text, maxWords)) setShowBtn(false);
    }
  }, []);

  return (
    <div className='accordion'>
      <div
        className='accordionBody'
        ref={contentRef}
        onClick={() => setShowFull(true)}>
        {React.cloneElement(children, {
          showFull: showFull,
          maxWords: maxWords,
          maxHeight: maxHeight,
        })}
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
  maxHeight: PropTypes.number,
  maxWords: PropTypes.number,
};

export default React.memo(Accordion);
