import Picker from 'emoji-picker-react';
import React, { useState } from 'react';

export default function TextAreaField(props) {
  const [text, setText] = useState('');
  const [choosingEmoji, setChoosingEmoji] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setText((oldMessage) => oldMessage + emojiObject.emoji);
  }
  const handleEmojiButton = (event) => {
    event.preventDefault();
    setChoosingEmoji((oldState) => !oldState);
  }
  const onChangingText = (event) => {
    setText(event.target.value);
    props.onChange(props.name, event.target.value, '');
  }
  
  return (
    <div className={props.className} style={{
      ...props.style
    }}>
      <textarea className='textarea-field' placeholder={props.placeholder} maxLength={3000} name="" id="" cols="30" value={text} onChange={onChangingText}></textarea>
      <button className="emoji-button" onClick={handleEmojiButton} style={{
        border: choosingEmoji ? "2px solid #f8a81f" : "none"
      }}>
        <svg class="Sq(40px) My(8px)" viewBox="0 0 24 24" width="24px" height="24px" focusable="false" aria-hidden="true" role="presentation"><g fill="none" fill-rule="nonzero"><circle cx="10" cy="10" r="10" transform="translate(2 2)" fill="#f0f2f4"></circle><path d="M12 15.3c1.398 0 2.58-.876 3.066-2.1H8.934A3.298 3.298 0 0012 15.3m-2.1-3.9a.9.9 0 100-1.8.9.9 0 000 1.8m4.2 0a.9.9 0 100-1.8.9.9 0 000 1.8M12 16.8a4.8 4.8 0 110-9.6 4.8 4.8 0 010 9.6M12 6a6 6 0 100 12 6 6 0 000-12z" fill="#f8a81f"></path></g></svg>
      </button>
      <div className="emoji-window" style={{
        display: choosingEmoji ? "block" : "none"
      }}>
        <Picker disableSearchBar={true} onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />
      </div>
    </div>
  )
};
