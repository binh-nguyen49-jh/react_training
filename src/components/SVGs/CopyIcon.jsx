import React from 'react';

function CopyIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='none'>
      <path
        d='M2.5 6.95V18.2H13.75V6.95H2.5ZM1.875 5.7H14.375C14.5408 5.7 14.6997 5.76584 14.8169 5.88305C14.9342 6.00027 15 6.15924 15 6.325V18.825C15 18.9908 14.9342 19.1497 14.8169 19.2669C14.6997 19.3841 14.5408 19.45 14.375 19.45H1.875C1.70924 19.45 1.55027 19.3841 1.43306 19.2669C1.31585 19.1497 1.25 18.9908 1.25 18.825V6.325C1.25 6.15924 1.31585 6.00027 1.43306 5.88305C1.55027 5.76584 1.70924 5.7 1.875 5.7ZM18.75 2.575V16.325C18.75 16.4908 18.6842 16.6497 18.5669 16.7669C18.4497 16.8841 18.2908 16.95 18.125 16.95H16.25V15.7H17.5V3.2H7.5V4.45H6.25V2.575C6.25 2.40924 6.31585 2.25027 6.43306 2.13306C6.55027 2.01584 6.70924 1.95 6.875 1.95H18.125C18.2908 1.95 18.4497 2.01584 18.5669 2.13306C18.6842 2.25027 18.75 2.40924 18.75 2.575ZM5 13.825H11.25V15.075H5V13.825ZM5 10.075H11.25V11.325H5V10.075Z'
        fill='black'
      />
    </svg>
  );
}

export default CopyIcon;