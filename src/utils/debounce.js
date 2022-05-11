export default function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    const later = () => {
      func(...args);
      timeout = null;
    };
    timeout = setTimeout(later, wait);
  };
}
