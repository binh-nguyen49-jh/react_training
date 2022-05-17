import React from 'react';
import Modal from '../HOC/Modal/Modal';
import DotsIcon from '../SVGs/DotsIcon.jsx';
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
