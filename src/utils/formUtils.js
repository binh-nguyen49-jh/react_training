export const isUploadedByUser = ({ photo, photoUrl }) => {
  // The url of image uploaded by user has the format: 'https://firebasestorage.googleapis.com/v0/b/...'
  return !photoUrl.startsWith('http');
};

export const convertObjectToFormState = (object) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      {
        value: value,
      },
    ])
  );
