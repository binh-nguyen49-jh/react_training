export const getValueInRange = (min, value, max) => {
  return Math.min(Math.max(min, value), max);
};
