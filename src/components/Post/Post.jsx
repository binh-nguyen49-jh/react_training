import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import TextAreaField from '../TextAreaField/TextAreaField';
import PropTypes from 'prop-types';
import './Post.scss';
import Popover from '../HOC/Popover';
import Badge from './Badge';
import UserPopover from './UserPopover';
import Modal from '../HOC/Modal';
import UserPostAPI from '../../API/userPostAPI';
import { toast } from 'react-toastify';

function Post(props) {
  const { user, post } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(props.liked || false);
  const [showingComment, setShowingComment] = useState(false);
  const commentRef = useRef(null);
  const likeRef = useRef(null);
  const [showPopover, setShowPopover] = useState(false);
  const [internalShowPopover, setInternalShowPopover] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);

  const onClickLike = (isLiked) => {
    likeRef.current.animate(
      [
        {
          transform: 'scale(0.5)',
          opacity: 0,
        },
        {
          transform: 'scale(1)',
          opacity: 1,
        },
        {
          transform: 'scale(0.5)',
          opacity: 0,
        },
      ],
      {
        duration: 300,
        iterations: 1,
        easing: 'cubic-bezier(0,.75,1,.14)',
      }
    );

    setLiked(isLiked);
  };

  const onClickCarousel = (event) => {
    const postRect = event.target.getBoundingClientRect();
    const direction =
      event.clientX - postRect.left > postRect.width / 2 ? 1 : -1;
    const newIdxImage = currentImage + direction;
    if (newIdxImage >= 0 && newIdxImage < post.images.length) {
      setCurrentImage(newIdxImage);
    }
  };

  const onSubmitComment = (event) => {
    event.preventDefault();
    console.log(commentRef.current.value);
  };

  const onHidePost = () => {
    setShowActionModal(false);
    UserPostAPI.interactPost(user.id, post.id, {
      hidden: true
    }).then((res) => {
      toast.success('Post hidden successfully');
    }).catch((err) => {
      console.log(err)
      toast.error('Error hiding post');
    });
  };

  return (
    <div className='post'>
      <div className='postHeader'>
        <div
          className='userInfo'
          onMouseOver={() => setShowPopover(true)}
          onMouseOut={() => setShowPopover(false)}>
          {(internalShowPopover || showPopover) && (
            <Popover
              onMouseOverPopover={() => setInternalShowPopover(true)}
              onMouseOutPopover={() => setInternalShowPopover(false)}>
              <UserPopover user={user} />
            </Popover>
          )}
          <Avatar
            imgUrl={user.avatar}
            style={{
              width: '32px',
              height: '32px',
            }}></Avatar>
          <Link className='username' to={'/profile'}>
            {user.name}
          </Link>
          <Badge text={user.position}></Badge>
        </div>
        <div
          className='action'
          onClick={() => setShowActionModal(!showActionModal)}
          style={{
            position: 'relative',
            cursor: 'pointer'
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
            <path d='M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z' />
          </svg>

          {
            showActionModal && (
              <Modal position='bottom-right'>
                <ul className='modalContent'>
                  <li onClick={onHidePost} className='modalItem'>Hide post</li>
                </ul>
              </Modal>
            )
          }
        </div>
      </div>
      <div className='postBody'>
        <div className='postCarousel'>
          <div
            className='carouselScreen'
            onClick={onClickCarousel}
            style={{
              backgroundImage: `url(${post.images[currentImage]})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}>
            <div className='carouselButtons'>
              <svg
                className='carouselButton'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 256 512'>
                <path d='M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z' />
              </svg>
              <svg
                className='carouselButton'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 256 512'>
                <path d='M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z' />
              </svg>
            </div>
          </div>
          <div className='carouselIndicator'>
            {post.images.map((val, idx) => (
              <div
                className={`indicator ${idx === currentImage ? 'active' : ''}`}
                onClick={(e) => setCurrentImage(idx)}
                key={idx}
              />
            ))}
          </div>
        </div>
        <div className='postReaction'>
          <div className='like' ref={likeRef}>
            {liked ? (
              <svg
                className='likeIcon'
                onClick={() => onClickLike(false)}
                fill='#ed4956'
                height='24'
                viewBox='0 0 48 48'
                width='24'>
                <path d='M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
              </svg>
            ) : (
              <svg
                className='likeIcon'
                onClick={() => onClickLike(true)}
                fill='#262626'
                height='24'
                viewBox='0 0 48 48'
                width='24'>
                <path d='M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
              </svg>
            )}
          </div>
        </div>

        <div className='textBody'>
          <p className='likes'>1,275 lượt thích</p>
          <p className='status'>
            <Link className='username' to='/profile'>
              {user.name}
            </Link>
            {post.status}
          </p>
          <div className='comments'>
            <div
              className='commentsButton'
              onClick={() => setShowingComment(!showingComment)}>
              {showingComment ? 'Ẩn tất cả bình luận' : 'Xem tất cả bình luận'}
            </div>
            <ul className={`commentsList ${showingComment ? 'show' : ''}`}>
              <li className='comment'>
                <p className='commentContent'>
                  <Link className='username commentOwner' to='/profile'>
                    ihney__
                  </Link>
                  @dnnhatvy bạn ơi!!
                </p>
              </li>
              <li className='comment'>
                <p className='commentContent'>
                  <Link className='username commentOwner' to='/profile'>
                    neymar389
                  </Link>
                  @diauhq bạn à!!
                </p>
              </li>
            </ul>
          </div>
          <p className='timestamp'>{post.createdAt}</p>
        </div>
      </div>
      <div className='postFooter'>
        <form>
          <TextAreaField ref={commentRef} />
          <button onClick={onSubmitComment} type='submit'>
            Đăng
          </button>
        </form>
      </div>
    </div>
  );
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  liked: PropTypes.bool,
};

export default React.memo(Post);
