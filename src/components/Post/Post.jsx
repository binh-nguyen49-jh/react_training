import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import TextAreaField from '../TextAreaField/TextAreaField';
import PropTypes from 'prop-types';
import './Post.scss';
import Popover from '../HOC/Modal/Popover';
import UserPopover from './UserPopover';
import UserPostAPI from '../../API/userPostAPI';
import { toast } from 'react-toastify';
import RoleIcon from './RoleIcon';
import { POSITIONS } from '../../config/constants';
import PostCarousel from './PostCarousel';
import Comments from './Comments';
import usePopover from '../../hooks/usePopover';
import { ReactComponent as FilledHeartIcon } from '../SVGs/FilledHeartIcon.svg';
import { ReactComponent as EmptyHeartIcon } from '../SVGs/EmptyHeartIcon.svg';
import PostAction from './PostAction';

function Post(props) {
  const { owner, post, hidePost, user, postRef } = props;
  const [liked, setLiked] = useState(props.liked || false);
  const commentRef = useRef(null);
  const likeRef = useRef(null);
  const [showActionModal, setShowActionModal] = useState(false);

  const {
    showPopover,
    internalShowPopover,
    onMouseOverPopover,
    onMouseOutPopover,
    onMouseOverInternalPopover,
    onMouseOutInternalPopover,
  } = usePopover();

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

  const onSubmitComment = (event) => {
    event.preventDefault();
  };

  const onHidePost = () => {
    setShowActionModal(false);
    UserPostAPI.interactPost(user.uid, post.id, {
      hidden: true,
    })
      .then((res) => {
        toast.success('Hide post successfully');
        hidePost();
      })
      .catch((err) => {
        toast.error('Error hiding post');
      });
  };

  return (
    <div className='post' ref={postRef}>
      <div className='postHeader'>
        <div
          className='userInfo'
          onMouseOver={onMouseOverPopover}
          onMouseOut={onMouseOutPopover}>
          {(internalShowPopover || showPopover) && (
            <Popover
              onMouseOverPopover={onMouseOverInternalPopover}
              onMouseOutPopover={onMouseOutInternalPopover}>
              <UserPopover user={owner} />
            </Popover>
          )}
          <Link className='profileLink' to={`/profile/${owner.uid}`}>
            <Avatar imgUrl={owner.avatar}></Avatar>
            <h3 className='username'>{owner.name}</h3>
          </Link>
          <div className='badges'>
            {owner.position
              .slice(0, 3)
              .map(
                (position, idx) =>
                  POSITIONS[position] && (
                    <RoleIcon key={idx} role={POSITIONS[position]} />
                  )
              )}
          </div>
        </div>
        <PostAction
          showActionModal={showActionModal}
          setShowActionModal={setShowActionModal}
          position={'bottom-right'}>
          <li onClick={onHidePost} className='modalItem'>
            Hide post
          </li>
        </PostAction>
      </div>
      <div className='postBody'>
        {post.imageUrls.length > 0 && <PostCarousel post={post} />}
        <div className='postReaction'>
          <div className='like' ref={likeRef}>
            {liked ? (
              <FilledHeartIcon
                className='likeIcon'
                onClick={() => onClickLike(false)}
              />
            ) : (
              <EmptyHeartIcon
                className='likeIcon'
                onClick={() => onClickLike(true)}
              />
            )}
          </div>
          <p className='likes'>1,275 lượt thích</p>
        </div>

        <div className='textBody'>
          <p className='status'>
            <Link className='username' to='/profile'>
              {owner.name}
            </Link>
            {post.content}
          </p>
          <Comments
            comments={[
              {
                username: 'Nguyễn Văn A',
                content: 'Nice post!',
                uid: '1',
              },
              {
                username: 'Nguyễn Văn B',
                content: 'Nice post!',
                uid: '2',
              },
            ]}
          />
          <p className='timestamp'>
            {post.createdAt && post.createdAt.toDate().toDateString()}
          </p>
        </div>
      </div>
      <div className='postFooter'>
        <form>
          <TextAreaField placeholder={'Type your comment'} ref={commentRef} />
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
  hidePost: PropTypes.func.isRequired,
  postRef: PropTypes.func,
};

export default React.memo(Post);
