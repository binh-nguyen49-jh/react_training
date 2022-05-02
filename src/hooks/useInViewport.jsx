import { useCallback, useState } from 'react';

const useInViewport = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
} = {}) => {
  const [observer, setObserver] = useState();
  const [isIntersecting, setIntersecting] = useState(false);

  const entryRef = useCallback(
    (node) => {
      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );

        observer.observe(node);
        setObserver(observer);
      }
    },
    [root, rootMargin, threshold]
  );

  return { entryRef, isIntersecting, observer };
};

export default useInViewport;
