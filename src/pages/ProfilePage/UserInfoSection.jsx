import { indexedDBLocalPersistence } from 'firebase/auth';
import { useCallback } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import Avatar from '../../components/Avatar/Avatar';
import Badge from '../../components/Badge/Badge';
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
      <div className='profilePosition'>
        <h3 className='positionTitle'>Position</h3>
        <Accordion maxHeight='100px'>
          <div className='positionContainer'>
            {position.map((positionName, idx) => (
              <Badge key={idx} text={positionName} />
            ))}
          </div>
        </Accordion>
      </div>
      <div className='profileBio'>
        <h3 className='bioTitle'>Biography</h3>
        <Accordion maxHeight='100px'>
          <p className='bio'>{bio}</p>
        </Accordion>
      </div>
    </div>
  );
}
