import React from 'react';
import ProfileForm from '../../components/Forms/ProfileForm/ProfileForm';
import './UpdateProfile.scss';

function CreateProfilePage() {
  return (
    <main className='updateProfile'>
      <div className='container'>
        <h1>Create Profile</h1>
        <ProfileForm />
      </div>
    </main>
  );
}

export default CreateProfilePage;
