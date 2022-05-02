import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Comments({ comments }) {
  const [showingComment, setShowingComment] = useState(false);
  return (
    <div className='comments'>
      <div
        className='commentsButton'
        onClick={() => setShowingComment(!showingComment)}>
        {showingComment ? 'Ẩn tất cả bình luận' : 'Xem tất cả bình luận'}
      </div>
      <ul className={`commentsList ${showingComment ? 'show' : ''}`}>
        {comments.map((comment) => (
          <li className='comment'>
            <p className='commentContent'>
              <Link
                className='username commentOwner'
                to={`/profile/${comment.uid}`}>
                {comment.username}
              </Link>
              {comment.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
