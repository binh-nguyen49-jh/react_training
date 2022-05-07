import { EMAIL_REGEX } from '../config/constants';

export const required = (value) =>
  value ? undefined : 'This field is required';

export const minLength = (min) => (value) =>
  value.length >= min
    ? undefined
    : `The length should be greater than ${min} characters`;

export const maxLength = (max) => (value) =>
  value.length <= max
    ? undefined
    : `The length should be lower than ${max} characters`;

export const emailFormat = (value) =>
  value && !EMAIL_REGEX.test(value) ? 'Invalid email address' : undefined;

export const haveImage = (value) =>
  value.photo && value.photoUrl ? undefined : 'Please upload an image';

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
