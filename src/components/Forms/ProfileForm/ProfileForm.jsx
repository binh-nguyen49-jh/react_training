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
  convertListToObject,
  convertObjectToFormState,
  convertToDateInputFormat,
  convertToFormImages,
  isUploadedByUser,
} from '../../../utils/formUtils';
import DropdownField from '../../DropdownField/DropdownField';
import { POSITIONS } from '../../../config/constants';
import withFirebaseAuth from '../../HOC/withFirebaseAuth';
import ToggleField from '../../ToggleField/ToggleField';
import TextAreaField from '../../TextAreaField/TextAreaField';
import { v4 as uuidv4 } from 'uuid';
import BioField from '../../BioField/BioField';

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

  onHighlightImageChange = (name, image, error) => {
    this.setState((prevState) => {
      const { highlightImages } = prevState;
      highlightImages.value[name] = image;
      return {
        highlightImages: {
          ...highlightImages,
        },
      };
    });
  };

  onAddHighlightImage = (name, image, error) => {
    // Create random key for new highlight image
    name = uuidv4();
    this.onHighlightImageChange(name, image, error);
  };

  onRemoveHighlight = (name) => {
    this.setState((prevState) => {
      const { highlightImages } = prevState;
      delete highlightImages.value[name];
      return {
        highlightImages: {
          ...highlightImages,
        },
      };
    });
  };

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
          <div className='highlightImages'>
            <h3>Highlight Images</h3>
            <div className='images'>
              {Object.entries(highlightImages.value).map(([key, value]) => {
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
        </div>
      </form>
    );
  }
}

export default withFirebaseAuth(ProfileForm);
