import React from 'react';
import { toast } from 'react-toastify';
import {
  haveAtLeastImage,
  haveImage,
  required,
} from '../../../utils/formValidate';
import ImageField from '../../ImageField/ImageField';
import InputField from '../../InputField/InputField';
import UserAPI from '../../../API/userAPI';
import Form from '../Form';
import './ProfileForm.scss';
import {
  convertObjectToFormState,
  convertToDateInputFormat,
  convertToFormImages,
  isUploadedByUser,
} from '../../../utils/formUtils';
import DropdownField from '../../DropdownField/DropdownField';
import LoadingButton from '../../LoadingButton/LoadingButton';
import { POSITIONS } from '../../../config/constants';
import withFirebaseAuth from '../../HOC/withFirebaseAuth';
import ToggleField from '../../ToggleField/ToggleField';
import { v4 as uuidv4 } from 'uuid';
import BioField from '../../BioField/BioField';
import { Link } from 'react-router-dom';

class ProfileForm extends Form {
  constructor(props) {
    super(props);
    const { user } = this.props;
    const { avatarUrl, highlightImages, dob, position, bio, name, status } =
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
      highlightImages: {
        value: convertToFormImages(highlightImages),
      },
      ...convertObjectToFormState({
        name,
        bio,
        status,
      }),
    };

    this.validators = {
      avatar: haveImage,
      name: required,
      highlightImages: haveAtLeastImage,
      position: required,
    };
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

  componentDidMount() {
    this.setState({
      isInvalidForm: !this.checkValidateForm(false),
    });
  }

  onHighlightImageChange = (name, image, error) => {
    const { highlightImages } = this.state;
    highlightImages.value[name] = image;
    this.onChangeForm('highlightImages', highlightImages.value);
  };

  onAddHighlightImage = (name, image, error) => {
    // Create random key for new highlight image
    name = uuidv4();
    this.onHighlightImageChange(name, image, error);
  };

  onRemoveHighlight = (name) => {
    const { highlightImages } = this.state;
    delete highlightImages.value[name];
    this.onChangeForm('highlightImages', highlightImages.value);
  };

  render() {
    const { avatar, name, highlightImages, dob, position, isInvalidForm } =
      this.state;
    const {
      position: defaultPosition,
      bio: defaultBio,
      name: defaultName,
      status: defaultStatus,
    } = this.props.user;
    return (
      <form className='profileForm'>
        <div className='container'>
          <div className='avatarInput'>
            <ImageField
              name='avatar'
              onChange={this.onChangeForm}
              defaultValue={avatar.value}
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
              defaultValue={defaultName}
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
              defaultValues={defaultPosition.join(', ')}
              error={position.error}
              onChange={this.onChangeForm}
            />
            <BioField
              name='bio'
              label='Biography'
              defaultValue={defaultBio}
              onChange={this.onChangeForm}
            />
            <ToggleField
              name='status'
              label='Status'
              onChange={this.onChangeForm}
              defaultValue={defaultStatus}
            />
          </div>
          <div className='highlightImages'>
            <h3>Highlight Images</h3>
            <div className='images'>
              {highlightImages.value &&
                Object.entries(highlightImages.value).map(([key, value]) => {
                  return (
                    <ImageField
                      key={key}
                      name={key}
                      onChange={this.onHighlightImageChange}
                      onRemove={this.onRemoveHighlight}
                      defaultValue={value}
                    />
                  );
                })}
              <ImageField
                className={'addImageField'}
                key={`addHighlightImages`}
                name={`addHighlightImages`}
                onChange={this.onAddHighlightImage}
                alwaysUpdate
              />
            </div>
          </div>
          <div className='actionContainer'>
            <Link to='/view-profile' className='btn link'>
              View Profile
            </Link>
            <LoadingButton
              text='Save'
              handleOnClick={this.handleSubmit}
              disabled={isInvalidForm}
              type='submit'
            />
          </div>
        </div>
      </form>
    );
  }
}

export default withFirebaseAuth(ProfileForm);
