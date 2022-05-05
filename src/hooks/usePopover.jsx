import { useState, useCallback } from 'react';

export default function usePopover() {
  const [showPopover, setShowPopover] = useState(false);
  const [internalShowPopover, setInternalShowPopover] = useState(false);

  const onMouseOverPopover = useCallback(() => {
    setShowPopover(true);
  }, [setShowPopover]);

  const onMouseOutPopover = useCallback(() => {
    setShowPopover(false);
  }, [setShowPopover]);

  const onMouseOverInternalPopover = useCallback(() => {
    setInternalShowPopover(true);
  }, [setInternalShowPopover]);

  const onMouseOutInternalPopover = useCallback(() => {
    setInternalShowPopover(false);
  }, [setInternalShowPopover]);

  return {
    showPopover,
    internalShowPopover,
    onMouseOverPopover,
    onMouseOutPopover,
    onMouseOverInternalPopover,
    onMouseOutInternalPopover,
  };
}
