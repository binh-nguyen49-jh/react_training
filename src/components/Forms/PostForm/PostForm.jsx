import React, { useCallback, useRef, useState } from 'react';
import PostAPI from '../../../API/postAPI';
import { MAX_IMAGE_INPUTS } from '../../../config/constants';
import Avatar from '../../Avatar/Avatar';
import TextAreaField from '../../TextAreaField/TextAreaField';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/authentication';
import { ReactComponent as ImageIcon } from '../SVGs/ImageIcon.svg';
import { ReactComponent as DeleteIcon } from '../SVGs/DeleteIcon.svg';
import './PostForm.scss';

function PostForm(props) {
  const { user } = useAuth();
  const textAreaRef = useRef(null);
  const [postText, setPostText] = useState('');
  const [photos, setPhotos] = useState(new Array(MAX_IMAGE_INPUTS).fill(null));
  const [photoUrls, setPhotoUrls] = useState(
    new Array(MAX_IMAGE_INPUTS).fill(null)
  );

  const onSubmitForm = (event) => {
    event.preventDefault();
    try {
      const uploadedImages = photos.filter((photo) => photo !== null);
      PostAPI.createPost({
        images: [...uploadedImages],
        content: postText,
        ownerId: user.uid,
      });
      textAreaRef.current.value = '';
      setPhotos(new Array(MAX_IMAGE_INPUTS).fill(null));
      setPhotoUrls(new Array(MAX_IMAGE_INPUTS).fill(null));
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post!');
    }
  };

  const onSelectImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = await URL.createObjectURL(file);
      // Fill image to empty slots
      let emptySlot = photoUrls.findIndex((url) => url == null);
      emptySlot = emptySlot === -1 ? MAX_IMAGE_INPUTS - 1 : emptySlot;
      setPhotoUrls((oldPhotoUrls) => {
        oldPhotoUrls[emptySlot] = fileUrl;
        return [...oldPhotoUrls];
      });
      setPhotos((oldPhotos) => {
        oldPhotos[emptySlot] = file;
        return [...oldPhotos];
      });
    }
  };

  function onRemoveImage(index) {
    setPhotos((oldPhotos) => {
      oldPhotos[index] = null;
      return [...oldPhotos];
    });
    setPhotoUrls((oldPhotoUrls) => {
      oldPhotoUrls[index] = null;
      return [...oldPhotoUrls];
    });
  }

  const onChangePostText = useCallback((value) => {
    setPostText(value);
  }, []);

  return (
    <div className='postForm'>
      <div className='formContainer'>
        <div className='formTop'>
          <Avatar />
          <TextAreaField
            onChange={onChangePostText}
            ref={textAreaRef}
            placeholder={"What's happening?"}
          />
        </div>
        <div className='formImages'>
          {photoUrls.map(
            (photoUrl, idx) =>
              photoUrl !== null && (
                <div
                  key={photoUrl}
                  className='formImage'
                  style={{
                    backgroundImage: photoUrl ? `url('${photoUrl}')` : '',
                  }}>
                  <DeleteIcon onClick={() => onRemoveImage(idx)} />
                </div>
              )
          )}
        </div>
        <hr />
        <div className='formBottom'>
          <div className='fileInput'>
            <input onChange={onSelectImage} type='file' id='file' name='file' />
            <label htmlFor='file'>
              <ImageIcon />
              <p>Photo</p>
            </label>
          </div>

          <button
            type='submit'
            disabled={postText.length === 0}
            onClick={onSubmitForm}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostForm);
