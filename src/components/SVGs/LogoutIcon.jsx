import React from 'react';

function LogoutIcon({ className, onClick }) {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'>
      <path
        d='M17 7.42352L15.59 8.83352L18.17 11.4235H8V13.4235H18.17L15.59 16.0035L17 17.4235L22 12.4235L17 7.42352ZM4 5.42352H12V3.42352H4C2.9 3.42352 2 4.32352 2 5.42352V19.4235C2 20.5235 2.9 21.4235 4 21.4235H12V19.4235H4V5.42352Z'
        fill='black'
      />
    </svg>
  );
}

export default LogoutIcon;
