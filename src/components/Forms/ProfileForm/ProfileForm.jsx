import React from 'react';
import { toast } from 'react-toastify';
import { haveImage, required } from '../../../utils/formValidate';
import ImageField from '../../ImageField/ImageField';
import InputField from '../../InputField/InputField';
import UserAPI from '../../../API/userAPI';
import Form from '../Form';
import './ProfileForm.scss';
import {
  convertObjectToFormState,
  convertToDateInputFormat,
  isUploadedByUser,
} from '../../../utils/formUtils';
import DropdownField from '../../DropdownField/DropdownField';
import { POSITIONS } from '../../../config/constants';
import withFirebaseAuth from '../../HOC/withFirebaseAuth';
import ToggleField from '../../ToggleField/ToggleField';
import TextAreaField from '../../TextAreaField/TextAreaField';
import BioField from '../../BioField/BioField';

class ProfileForm extends Form {
  constructor(props) {
    super(props);
    const { user } = this.props;
    const { avatarUrl, dob, position, authProvider, email, uid, ...userInfo } =
      user;
    this.state = {
      ...super.state,
      avatar: {
        value: {
          photo: null,
          photoUrl: avatarUrl,
        },
      },
      dob: {
        value: convertToDateInputFormat(dob.toDate()),
      },
      position: {
        value: position.join(', '),
      },
      ...convertObjectToFormState(userInfo),
    };

    this.validators = {
      avatar: haveImage,
      name: required,
      highlightImages: required,
      position: required,
    };

    this.isFirstRender = React.createRef();
    this.isFirstRender.current = true;
  }

  handleSubmit = this.handleSubmitTemplate(() => {
    try {
      const { highlightImages, avatar, ...userInfo } = this.state;
      const { user } = this.props;

      // just get the photo uploaded by user ()
      const uploadedHighlightImages = highlightImages
        .filter((image) => isUploadedByUser(image))
        .map((image) => image.photo);

      UserAPI.updateProfile(user, {
        avatar: avatar.value.photo,
        highlightImages: uploadedHighlightImages,
        ...userInfo,
      });

      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error('Failed to create post!');
    }
  });

  render() {
    const { avatar, name, highlightImages, bio, dob, position, status } =
      this.state;
    return (
      <form className='profileForm'>
        <div className='container'>
          <div className='avatarInput'>
            <ImageField
              name='avatar'
              onChange={this.onChangeForm}
              defaultValue={avatar}
            />
          </div>
          <div className='userInfo'>
            <InputField
              onValidate={this.onValidateInput}
              type='name'
              name='name'
              label='Name'
              placeholder='Type your name'
              error={name.error}
              onChange={this.onChangeForm}
              defaultValue={this.state.name.value}
            />
            <InputField
              onValidate={this.onValidateInput}
              type='date'
              name='dob'
              label='Date of Birth'
              error={dob.error}
              onChange={this.onChangeForm}
              defaultValue={dob.value}
            />
            <DropdownField
              onValidate={this.onValidateInput}
              name='position'
              label='Position'
              placeholder='Select your position'
              options={Object.keys(POSITIONS)}
              defaultValues={position.value}
              error={position.error}
              onChange={this.onChangeForm}
            />
            <BioField
              name='bio'
              label='Biography'
              defaultValue={bio.value}
              onChange={this.onChangeForm}
            />
            <ToggleField
              name='status'
              label='Status'
              onChange={this.onChangeForm}
              defaultValue={status.value}
            />
          </div>
          <div className='imageInputs'></div>
        </div>
      </form>
    );
  }
}

export default withFirebaseAuth(ProfileForm);
