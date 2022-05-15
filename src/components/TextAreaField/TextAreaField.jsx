import Picker from 'emoji-picker-react';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import EmojiIcon from '../SVGs/EmojiIcon.jsx';
import './TextAreaField.scss';

const TextAreaField = React.forwardRef((props, ref) => {
  const [choosingEmoji, setChoosingEmoji] = useState(false);
  const containerRef = useRef(null);
  const internalTextareaRef = useRef(null);
  const emojiWindow = useRef(null);

  const textareaRef = ref || internalTextareaRef;

  const onEmojiClick = useCallback(
    (event, emojiObject) => {
      if (textareaRef.current) {
        const { selectionStart, selectionEnd } = textareaRef.current;

        const text = textareaRef.current.value;
        const newText =
          text.slice(0, selectionStart) +
          emojiObject.emoji +
          text.slice(selectionEnd);
        textareaRef.current.value = newText;
        props.onChange && props.onChange(newText);
      }
    },
    [textareaRef]
  );

  const handleEmojiButton = (event) => {
    event.preventDefault();
    setChoosingEmoji((oldState) => !oldState);
  };

  const responsiveHeight = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.height = '0'; // To get full of scrollHeight
      containerRef.current.style.height =
        parseInt(textareaRef.current.scrollHeight) + 16 + 'px';
    }
  }, [textareaRef, containerRef]);

  const onChangingText = (event) => {
    responsiveHeight();
    props.onChange(event.target.value);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = '0px';
    }
  }, []);

  const { className, placeholder, name, style } = props;

  return (
    <div
      className={`${className} textareaContainer`}
      ref={containerRef}
      style={{
        ...style,
      }}>
      <textarea
        ref={textareaRef}
        className='textareaField'
        placeholder={placeholder}
        maxLength={3000}
        cols='30'
        rows='10'
        id={name}
        defaultValue={props.defaultValue}
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
  name: '',
  defaultValue: '',
};

TextAreaField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default React.memo(TextAreaField);
