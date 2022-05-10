import { v4 as uuidv4 } from 'uuid';

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

export const convertToFormImages = (images) =>
  Object.fromEntries(
    Object.entries(images).map(([key, value]) => [
      key,
      {
        url: value,
        photo: null,
      },
    ])
  );

export const convertToDateInputFormat = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).padStart(4, '0');
  return `${year}-${month}-${day}`;
};
