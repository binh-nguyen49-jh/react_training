import Picker from 'emoji-picker-react';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './TextAreaField.scss';

const TextAreaField = React.forwardRef((props, ref) => {
  const [choosingEmoji, setChoosingEmoji] = useState(false);
  const containerRef = useRef(null);
  const emojiWindow = useRef(null);
  
  const onEmojiClick = (event, emojiObject) => {
    if (ref.current) {
      ref.current.value += emojiObject.emoji;
    }
  };

  const handleEmojiButton = (event) => {
    event.preventDefault();
    setChoosingEmoji((oldState) => !oldState);
  };

  const responsiveHeight = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.height = "0"; // To get full of scrollHeight
      containerRef.current.style.height = parseInt(ref.current.scrollHeight) + 16 + "px";
    }
  }, [ref, containerRef]);
  
  const onChangingText = (event) => {
    responsiveHeight();
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = '0px';
    }
  }, [])
  

  return (
    <div
      className={`${props.className} textareaContainer`}
      ref={containerRef}
      style={{
        ...props.style,
      }}>
      <textarea
        ref={ref}
        className='textareaField'
        placeholder={props.placeholder}
        maxLength={3000}
        cols='30'
        rows='10'
        onInput={onChangingText}></textarea>
      <button
        className='emojiButton'
        onClick={handleEmojiButton}
        style={{
          border: choosingEmoji ? '2px solid #f8a81f' : 'none',
        }}>
        <svg
          viewBox='0 0 24 24'
          width='24px'
          height='24px'
          focusable='false'
          aria-hidden='true'
          role='presentation'>
          <g fill='none' fillRule='nonzero'>
            <circle
              cx='10'
              cy='10'
              r='10'
              transform='translate(2 2)'
              fill='#f0f2f4'></circle>
            <path
              d='M12 15.3c1.398 0 2.58-.876 3.066-2.1H8.934A3.298 3.298 0 0012 15.3m-2.1-3.9a.9.9 0 100-1.8.9.9 0 000 1.8m4.2 0a.9.9 0 100-1.8.9.9 0 000 1.8M12 16.8a4.8 4.8 0 110-9.6 4.8 4.8 0 010 9.6M12 6a6 6 0 100 12 6 6 0 000-12z'
              fill='#f8a81f'></path>
          </g>
        </svg>
      </button>
      <div
        ref={emojiWindow}
        className='emojiWindow'
        style={{
          display: choosingEmoji ? 'block' : 'none',
        }}>
        <Picker
          disableSearchBar={true}
          onEmojiClick={onEmojiClick}
          pickerStyle={{ width: '100%' }}
        />
      </div>
    </div>
  );
});

TextAreaField.defaultProps = {
  className: '',
  placeholder: '',
};

TextAreaField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default React.memo(TextAreaField);
