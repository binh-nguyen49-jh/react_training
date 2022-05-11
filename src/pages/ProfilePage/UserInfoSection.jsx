import { useCallback } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import ClipboardButton from '../../components/ClipboardButton/ClipboardButton';
import { convertToDateInputFormat } from '../../utils/formUtils';

export default function UserInfoSection({
  avatar,
  bio,
  status,
  dob,
  position,
  name,
}) {
  const copyURL = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
  }, []);
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
      <div className='profileDescription'>
        <h2 className='name'>{name}</h2>
        <em className='dob'>{convertToDateInputFormat(dob.toDate())}</em>
        <ClipboardButton onClick={copyURL} text='Copy URL' name='copyUrl' />
      </div>
      <div className='profilePosition'></div>
      <div className='profileBio'></div>
    </div>
  );
}
