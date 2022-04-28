import React, { useState } from 'react';
import UserPostAPI from '../../API/userPostAPI';
import Avatar from '../Avatar/Avatar';
import { toast } from 'react-toastify';
import Modal from '../HOC/Modal';
import { PropTypes } from 'prop-types';
import './Post.scss';

function HiddenPost(props) {
  const [showActionModal, setShowActionModal] = useState(false);
  const { user, post, showPost } = props;

  const onShowPost = () => {
    setShowActionModal(false);
    UserPostAPI.interactPost(user.id, post.id, {
      hidden: false,
    })
      .then((res) => {
        toast.success('Show post successfully');
        showPost();
      })
      .catch((err) => {
        toast.error('Error showing post');
      });
  };

  return (
    <div className='post hidden'>
      <div className='postHeader'>
        <div className='userInfo'>
          <Avatar
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--gray-2-cl)',
            }}
          />
          <p className='username'>This post has been hidden</p>
        </div>
        <div
          className='action'
          onClick={() => setShowActionModal(!showActionModal)}
          style={{
            position: 'relative',
            cursor: 'pointer',
          }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
            <path d='M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z' />
          </svg>

          {showActionModal && (
            <Modal position='bottom-right'>
              <ul className='modalContent'>
                <li onClick={onShowPost} className='modalItem'>
                  Show post
                </li>
              </ul>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

HiddenPost.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  showPost: PropTypes.func.isRequired,
};

export default React.memo(HiddenPost);
