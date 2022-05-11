import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserAPI from '../../API/userAPI';
import Avatar from '../../components/Avatar/Avatar';
import './ProfilePage.scss';

export default function ProfilePage(props) {
  // get uid from params
  const { uid } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userProfile = await UserAPI.getUserData(uid);
      setUserProfile(userProfile);
    };
    fetchUser();
  }, []);

  return (
    <main className='profilePage'>
      <div className='container'>
        <h1>Profile Page</h1>
        {userProfile && <UserInfoSection {...userProfile} />}
      </div>
    </main>
  );
}

function UserInfoSection({ avatar, bio, status, dob, position, name }) {
  return (
    <div className='userInfoSection'>
      <div className='profileAvatar'>
        <Avatar imgUrl={avatar} />
        <div className='status'>
          <div className='statusCircle'>
            <div
              className='circleInner'
              style={{
                backgroundColor: status
                  ? 'var(--primary-cl)'
                  : 'var(--gray-1-cl)',
              }}
            />
          </div>
        </div>
      </div>
      <div className='profileDescription'></div>
      <div className='profilePosition'></div>
      <div className='profileBio'></div>
    </div>
  );
}
