import React from 'react';

function AddImageIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'>
      <path
        d='M21 4.5V2.5H2.5V29.5H29.5V11.5H27.5V13.105L23.4519 9.05688L19.125 13.3839L12.875 7.13387L4.5 15.5089V4.5H21ZM23.4519 11.8854L27.5 15.9334V21.7589L20.5392 14.7981L23.4519 11.8854ZM12.875 9.9625L27.5 24.5875V27.5H4.5V18.3375L12.875 9.9625Z'
        fill='white'
      />
      <path d='M28 1H26V4H23V6H26V9H28V6H31V4H28V1Z' fill='white' />
    </svg>
  );
}

export default AddImageIcon;
