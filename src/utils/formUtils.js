export const isUploadedByUser = ({ photo, photoUrl }) => {
  // The url of image uploaded by user has the format: 'https://firebasestorage.googleapis.com/v0/b/...'
  return !photoUrl.startsWith('http');
};
