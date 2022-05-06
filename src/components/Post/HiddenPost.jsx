import React, { useState } from 'react';
import UserPostAPI from '../../API/userPostAPI';
import Avatar from '../Avatar/Avatar';
import { toast } from 'react-toastify';
import Modal from '../HOC/Modal/Modal';
import { PropTypes } from 'prop-types';
import { ReactComponent as DotsIcon } from '../SVGs/DotsIcon.svg';
import './Post.scss';

function HiddenPost(props) {
  const [showActionModal, setShowActionModal] = useState(false);
  const { user, post, showPost, postRef } = props;

  const onShowPost = () => {
    setShowActionModal(false);
    UserPostAPI.interactPost(user.uid, post.id, {
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
    <div className='post hidden' ref={postRef}>
      <div className='postHeader'>
        <div className='userInfo'>
          <Avatar />
          <p className='username'>This post has been hidden</p>
        </div>
        <div
          className='action'
          onClick={() => setShowActionModal(!showActionModal)}>
          <DotsIcon />
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
  postRef: PropTypes.func,
};

export default React.memo(HiddenPost);
