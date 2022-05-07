import React from 'react';
import { toast } from 'react-toastify';
import { haveImage, required } from '../../../utils/formValidate';
import ImageField from '../../ImageField/ImageField';
import InputField from '../../InputField/InputField';
import UserAPI from '../../../api/UserAPI';
import Form from '../Form';
import './ProfileForm.scss';
import { isUploadedByUser } from '../../../utils/formUtils';

class ProfileForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      ...super.state,
      avatar: {
        value: {
          photo: null,
          photoUrl: null,
        },
      },
      name: {},
      highlightImages: {},
      bio: {},
      position: {},
      status: {},
    };

    this.validators = {
      avatar: haveImage,
      name: required,
      highlightImages: required,
      position: required,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      avatar: {
        value: {
          photoUrl: user.avatarUrl,
        },
      },
      name: {
        value: user.name,
      },
      highlightImages: {
        value: user.highlightImages,
      },
      bio: {
        value: user.bio,
      },
      position: {
        value: user.position,
      },
      status: {
        value: user.status,
      },
    });
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
    const { avatar, name, highlightImages, bio, position, status } = this.state;
    return (
      <form>
        <div className='container'>
          <div className='avatarInput'>
            <ImageField name='avatar' onChange={this.onChangeForm} />
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
              defaultValue={name.value}
            />
          </div>
          <div className='imageInputs'></div>
        </div>
      </form>
    );
  }
}

export default ProfileForm;
