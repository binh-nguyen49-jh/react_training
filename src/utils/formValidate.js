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
  value && !/^\w+([._-]?\w+)*@\w+([._-]?\w+)*([.]\w{2,3})+$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
