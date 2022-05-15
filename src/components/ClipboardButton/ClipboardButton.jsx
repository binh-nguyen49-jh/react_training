import React, { useState } from 'react';
import CopyIcon from '../SVGs/CopyIcon.jsx';
import CheckIcon from '../SVGs/CheckIcon.jsx';
import { PropTypes } from 'prop-types';
import Modal from '../HOC/Modal/Modal';
import './ClipboardButton.scss';

function ClipboardButton({ name, text, onClick }) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleOnClick = () => {
    setCopied(true);
    onClick();
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  };

  return (
    <label onClick={handleOnClick} className='clipboard' htmlFor={name}>
      <input type='radio' name={name} id={name} />
      {copied ? (
        <CheckIcon className='icon checkIcon' />
      ) : (
        <CopyIcon className='icon copyIcon' />
      )}
      <p>{text}</p>
      {showTooltip && (
        <Modal space='10px' position={'bottom-left'}>
          <p>Copied!</p>
        </Modal>
      )}
    </label>
  );
}

ClipboardButton.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default ClipboardButton;
