import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserAPI from '../../API/userAPI';
import './ProfilePage.scss';
import UserInfoSection from './UserInfoSection';

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
