export const getValueInRange = (min, value, max) => {
  return Math.min(Math.max(min, value), max);
};

export const truncateText = (text, maxWords) => {
  const words = text.split(' ');
  if (words.length <= maxWords) {
    return text;
  }
  return text.slice(0, maxWords) + '...';
};
