import Picker from 'emoji-picker-react';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as EmojiIcon } from '../SVGs/EmojiIcon.svg';
import './TextAreaField.scss';

const TextAreaField = React.forwardRef((props, ref) => {
  const [choosingEmoji, setChoosingEmoji] = useState(false);
  const containerRef = useRef(null);
  const emojiWindow = useRef(null);

  const onEmojiClick = useCallback(
    (event, emojiObject) => {
      if (ref.current) {
        ref.current.value += emojiObject.emoji;
      }
    },
    [ref]
  );

  const handleEmojiButton = (event) => {
    event.preventDefault();
    setChoosingEmoji((oldState) => !oldState);
  };

  const responsiveHeight = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.height = '0'; // To get full of scrollHeight
      containerRef.current.style.height =
        parseInt(ref.current.scrollHeight) + 16 + 'px';
    }
  }, [ref, containerRef]);

  const onChangingText = (event) => {
    responsiveHeight();
    props.onChange(event.target.value);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = '0px';
    }
  }, []);

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
        <EmojiIcon />
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
  onChange: () => {},
};

TextAreaField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default React.memo(TextAreaField);
