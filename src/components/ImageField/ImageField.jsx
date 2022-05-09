import React, { useState } from 'react';
import { ReactComponent as AddImageIcon } from '../SVGs/AddImageIcon.svg';
import { ReactComponent as DeleteIcon } from '../SVGs/DeleteIcon.svg';
import { PropTypes } from 'prop-types';
import './ImageField.scss';

function ImageField({ name, className, onChange, defaultValue }) {
  const [photo, setPhoto] = useState(defaultValue.photo);
  const [photoUrl, setPhotoUrl] = useState(defaultValue.photoUrl);

  const onRemoveImage = () => {
    setPhoto(null);
    setPhotoUrl(null);
  };

  const onSelectImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = await URL.createObjectURL(file);
      setPhoto(file);
      setPhotoUrl(fileUrl);
      onChange(
        name,
        {
          photo,
          photoUrl,
        },
        ''
      );
    }
  };

  return (
    <label
      htmlFor={name}
      className={`imageField ${className}`}
      style={{
        backgroundImage: photoUrl ? `url('${photoUrl}')` : '',
      }}>
      <DeleteIcon className='deleteIcon' onClick={onRemoveImage} />
      <input onChange={onSelectImage} type='file' id={name} name={name} />
      <div className='overlay'>
        <AddImageIcon className='imgIcon' />
      </div>
    </label>
  );
}

ImageField.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
};

ImageField.defaultProps = {
  className: '',
  onChange: () => {},
};

export default ImageField;
