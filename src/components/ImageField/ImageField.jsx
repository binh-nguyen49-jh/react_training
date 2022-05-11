import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as AddImageIcon } from '../SVGs/AddImageIcon.svg';
import { ReactComponent as DeleteIcon } from '../SVGs/DeleteIcon.svg';
import { PropTypes } from 'prop-types';
import './ImageField.scss';

function ImageField({
  name,
  className,
  onChange,
  defaultValue,
  onRemove,
  alwaysUpdate,
}) {
  const [photo, setPhoto] = useState(defaultValue);

  const onRemoveImage = () => {
    setPhoto({});
    onRemove(name);
  };

  const onChangeImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = await URL.createObjectURL(file);
      onChange(
        name,
        {
          photo: file,
          url: fileUrl,
        },
        ''
      );

      setPhoto({
        photo: file,
        url: fileUrl,
      });
    }
  };

  const onStartSelect = (event) => {
    if (alwaysUpdate) {
      event.target.value = null;
    }
  };

  return (
    <div className='imageField'>
      <label
        htmlFor={name}
        className={className}
        style={{
          backgroundImage: photo.url ? `url('${photo.url}')` : '',
        }}>
        <input
          onClick={onStartSelect}
          onChange={onChangeImage}
          type='file'
          id={name}
          name={name}
        />
        <div className='overlay'>
          <AddImageIcon className='imgIcon' />
        </div>
      </label>
      <DeleteIcon className='deleteIcon' onClick={onRemoveImage} />
    </div>
  );
}

ImageField.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  alwaysUpdate: PropTypes.bool,
  defaultValue: PropTypes.object,
};

ImageField.defaultProps = {
  className: '',
  onChange: () => {},
  onRemove: () => {},
  alwaysUpdate: false,
  defaultValue: {},
};

export default React.memo(ImageField);
