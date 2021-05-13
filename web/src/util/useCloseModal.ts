import { useEffect, useRef } from 'react';

export const useClickOut = (handler: () => void) => {
  const domNode = useRef(null);

  useEffect(() => {
    const maybeClickHandler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeClickHandler);

    return () => {
      document.removeEventListener('mousedown', maybeClickHandler);
    };
  }, [handler]);

  return domNode;
};
