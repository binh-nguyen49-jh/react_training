import React, { useEffect, useState } from 'react';
import { ReactComponent as ImageIcon } from '../SVGs/ImageIcon.svg';
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

  useEffect(() => {
    onChange(
      name,
      {
        photo,
        photoUrl,
      },
      ''
    );
  }, [photo, photoUrl]);

  const onSelectImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = await URL.createObjectURL(file);
      setPhoto(file);
      setPhotoUrl(fileUrl);
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
        <ImageIcon className='imgIcon' />
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

export default ImageField;
