import React from 'react';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';
import './HomePage.scss';

function HomePage(props) {
  return (
    <main className='homepage'>
      <div className='container'>
        <PostForm />
        <PostList />
      </div>
    </main>
  );
}

export default HomePage;
