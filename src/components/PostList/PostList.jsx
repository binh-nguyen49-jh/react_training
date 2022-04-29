import React, { useEffect, useState } from 'react';
import PostAPI from '../../API/postAPI';
import debounced from '../../utils/debounce';
import PostFactory from '../Post/PostFactory';
import './PostList.scss';

function PostList(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = props;

  const getPosts = debounced(async () => {
    if (user) {
      setIsLoading(true);
      const newPosts = await PostAPI.getPosts(user.uid);
      if (newPosts.length === 0) return;
      setPosts((oldPosts) =>  [...oldPosts, ...newPosts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)]);
      setIsLoading(false);
      window.scrollTo(0, window.scrollY - 100);
    }
  }, 1200);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight
      )
      return;
      getPosts();
    }
    // Reset cursor to the top of the database
    PostAPI.lastQueryPosition = null;
    getPosts();
    window.addEventListener('scroll', handleScroll);
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
