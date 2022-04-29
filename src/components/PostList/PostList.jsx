import React, { useCallback, useEffect, useState } from 'react';
import PostAPI from '../../API/postAPI';
import PostFactory from '../Post/PostFactory';
import './PostList.scss';

function PostList(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = props;

  const getPosts = async () => {
    if (user) {
      setIsLoading(true);
      const newPosts = await PostAPI.getPosts(user.uid, posts.length);
      setPosts([...posts, ...newPosts]);
      setIsLoading(false);
      // scroll back small amount
      window.scrollTo(0, window.scrollY - 10);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      getPosts();
    };
    window.addEventListener('scroll', handleScroll);
    getPosts();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className='postList'
        style={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
          gap: '3rem',
        }}>
        {posts.map((post) => (
          <PostFactory
            key={post.id}
            post={post}
            user={post.owner}
            isHidden={post.hidden}
          />
        ))}
      </div>
      <div className={`infinite-load ${isLoading ? 'show' : ''}`}>
        <div className='spinner' />
        <p>Loading...</p>
      </div>
    </>
  );
}

export default PostList;
