import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Comments({ comments }) {
  const [showingComment, setShowingComment] = useState(false);
  return (
    <div className='comments'>
      <div
        className='commentsButton'
        onClick={() => setShowingComment(!showingComment)}>
        {showingComment ? 'Hide all comments' : 'Show all comments'}
      </div>
      <ul className={`commentsList ${showingComment ? 'show' : ''}`}>
        {comments.map((comment, idx) => (
          <li key={idx} className='comment'>
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

Comments.typeProps = {
  comments: PropTypes.array,
};

export default React.memo(Comments);
