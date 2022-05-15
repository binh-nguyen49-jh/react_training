import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../../components/Accordion/Accordion';
import Avatar from '../../components/Avatar/Avatar';
import Badge from '../../components/Badge/Badge';
import ClipboardButton from '../../components/ClipboardButton/ClipboardButton';
import { convertToDateProfileFormat } from '../../utils/formUtils';
import { PropTypes } from 'prop-types';
import { POSITIONS } from '../../config/constants';
import TruncateText from '../../components/Accordion/TruncateText';
import TruncateHeight from '../../components/Accordion/TruncateHeight';

export default function UserInfoSection({
  avatar,
  bio,
  status,
  dob,
  position,
  name,
  isOwner,
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
        <em className='dob'>{convertToDateProfileFormat(dob.toDate())}</em>
        <ClipboardButton onClick={copyURL} text='Copy URL' name='copyUrl' />
      </div>
      <div className='profilePosition'>
        <h3 className='positionTitle'>Position</h3>
        <Accordion maxHeight={50}>
          <TruncateHeight className='positionContainer'>
            {position.map((positionName, idx) => (
              <Badge
                key={idx}
                text={positionName}
                style={{
                  backgroundColor: POSITIONS[positionName].color,
                }}
              />
            ))}
          </TruncateHeight>
        </Accordion>
      </div>
      <div className='profileBio'>
        <h3 className='bioTitle'>Biography</h3>
        <Accordion maxWords={200}>
          {<TruncateText className='bio'>{bio}</TruncateText>}
        </Accordion>
      </div>
      {isOwner && (
        <Link to='/update-profile' className='editLink btn'>
          Edit Profile
        </Link>
      )}
    </div>
  );
}

UserInfoSection.propTypes = {
  avatar: PropTypes.string,
  bio: PropTypes.string,
  status: PropTypes.bool,
  dob: PropTypes.any,
  position: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  isOwner: PropTypes.bool,
};
