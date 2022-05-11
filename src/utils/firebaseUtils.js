export const formatErrorCode = (code) => {
  return code.split('/')[1].split('-').join(' ');
};
