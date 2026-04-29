import { type RefObject, useEffect } from 'react';

interface UseDropdownDismissParams {
  rootRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
  closeOnOpenEventName?: string;
}

export function useDropdownDismiss({
  rootRef,
  isOpen,
  onClose,
  closeOnOpenEventName,
}: UseDropdownDismissParams): void {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleClickOutside(event: MouseEvent): void {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (rootRef.current && !rootRef.current.contains(event.target)) {
        onClose();
      }
    }

    function handleEscape(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    function handleAnotherDropdownOpen(): void {
      onClose();
    }

    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleEscape);

    if (closeOnOpenEventName) {
      window.addEventListener(closeOnOpenEventName, handleAnotherDropdownOpen);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscape);

      if (closeOnOpenEventName) {
        window.removeEventListener(closeOnOpenEventName, handleAnotherDropdownOpen);
      }
    };
  }, [closeOnOpenEventName, isOpen, onClose, rootRef]);
}
