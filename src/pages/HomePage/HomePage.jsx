import React, { Component, useEffect, useState } from 'react';
import UserAPI from '../../API/userAPI';
import PostFactory from '../../components/Post/PostFactory';
import PostForm from '../../components/PostForm/PostForm';
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
        <div
          className='postList'
          style={{
            width: '100%',
          }}>
          <PostFactory
            isHidden={false}
            user={{
              id: 'test',
              name: 'huubinh49',
              position: ['FE developer', 'FE developer', 'FE developer', 'FE developer'],
              avatar:
                'https://res.cloudinary.com/daten/image/upload/v1650819174/avatar_mlwjsm.jpg',
            }}
            post={{
              id: 'test',
              status:
                'Lorem qwe qwe qwe qwe qw eq weq we qwe qwe q we qwe q we qw e qwe qw e',
              createdAt: '14:30pm',
              images: [
                'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu-1.jpg',
                'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu-3.jpg',
              ],
            }}
          />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
