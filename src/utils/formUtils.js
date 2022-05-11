import { Timestamp } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';
import uploadSingleFile from './uploadImage';

export const isUploadedByUser = ({ photo, url }) => {
  // The url of image uploaded by user has the format: 'https://firebasestorage.googleapis.com/v0/b/...'
  return !url.startsWith('http');
};

export const convertObjectToFormState = (object) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      {
        value,
      },
    ])
  );

export const convertFormStateToObject = (formState) => {
  const object = {};
  Object.entries(formState).forEach(([key, value]) => {
    object[key] = value.value;
  });
  return object;
};

export const convertFormImagesToObject = (formImages) => {
  const object = {};
  Object.entries(formImages).forEach(([key, value]) => {
    object[key] = value.url;
  });
  return object;
};

export const convertFormattedDateToDate = (date) => {
  return new Date(Date.parse(date));
};

export const convertToTimestamp = (date) => {
  return Timestamp.fromDate(date);
};

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

export const uploadImages = async (images) => {
  const uploadedImages = {};
  const imageUrls = await Promise.all(
    Object.entries(images).map(([key, image]) =>
      isUploadedByUser(image) ? uploadSingleFile(image.photo) : image.url
    )
  );
  const imageKeys = Object.keys(images);
  imageKeys.forEach((key, index) => {
    uploadedImages[key] = imageUrls[index];
  });
  return uploadedImages;
};
