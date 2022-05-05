import React, { useCallback, useRef, useState } from 'react';
import PostAPI from '../../API/postAPI';
import { MAX_IMAGE_INPUTS } from '../../config/constants';
import Avatar from '../Avatar/Avatar';
import TextAreaField from '../TextAreaField/TextAreaField';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/authentication';
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
      // Fill image
      let missingImageUrl = photoUrls.findIndex((url) => url == null);
      missingImageUrl =
        missingImageUrl === -1 ? MAX_IMAGE_INPUTS - 1 : missingImageUrl;
      setPhotoUrls((oldPhotoUrls) => {
        oldPhotoUrls[missingImageUrl] = fileUrl;
        return [...oldPhotoUrls];
      });
      setPhotos((oldPhotos) => {
        oldPhotos[missingImageUrl] = file;
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
          <Avatar
            style={{
              width: '36px',
              height: '36px',
            }}
          />
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
                    backgroundPosition: '50% 0%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}>
                  <svg
                    onClick={() => onRemoveImage(idx)}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'>
                    <path d='M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z' />
                  </svg>
                </div>
              )
          )}
        </div>
        <hr />
        <div className='formBottom'>
          <div className='fileInput'>
            <input onChange={onSelectImage} type='file' id='file' name='file' />
            <label htmlFor='file'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path d='M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z' />
              </svg>
              <p>Photo</p>
            </label>
          </div>

          <button
            style={{
              color: 'var(--white-cl)',
              borderRadius: '4px',
              outline: 'none',
              border: 'none',
              padding: '8px 25px',
              fontSize: '1rem',
            }}
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
