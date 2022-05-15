import React from 'react';
import ProfileForm from '../../components/Forms/ProfileForm/ProfileForm';
import './UpdateProfile.scss';

function UpdateProfilePage({ title }) {
  return (
    <main className='updateProfile'>
      <div className='container'>
        <h1>Update Profile</h1>
        <ProfileForm />
      </div>
    </main>
  );
}

export default UpdateProfilePage;
