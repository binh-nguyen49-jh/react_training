import React from 'react';
import Modal from '../HOC/Modal/Modal';
import { ReactComponent as DotsIcon } from '../SVGs/DotsIcon.svg';
function PostAction({
  position,
  children,
  showActionModal,
  setShowActionModal,
}) {
  return (
    <div
      className='action'
      onClick={() => setShowActionModal(!showActionModal)}>
      <DotsIcon />
      {showActionModal && (
        <Modal position={position}>
          <ul className='modalContent'>{children}</ul>
        </Modal>
      )}
    </div>
  );
}

export default React.memo(PostAction);
