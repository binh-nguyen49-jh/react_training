import React, { useEffect, useState } from 'react';
import UserAPI from '../../API/userAPI';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';
import { useAuth } from '../../hooks/authentication';
import './HomePage.scss';

function HomePage(props) {
  const [userProfile, setUserProfile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function getUserProfile() {
      if( user ) {
        const userProfile = await UserAPI.getUser(user.uid);
        setUserProfile(userProfile);
      }
    }
    getUserProfile();
    
  }, [user]);

  return (
    <main className='homepage'>
      <div className='container'>
        <PostForm userProfile={userProfile} />
        <PostList user={user} />
      </div>
    </main>
  );
}

export default HomePage;
