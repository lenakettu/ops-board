import { useCallback, useMemo, useRef, useState } from 'react';

import { useDropdownDismiss } from '@/shared/hooks/useDropdownDismiss.ts';

import styles from './SingleSelect.module.css';
import type { SingleSelectProps } from './types';

const SELECT_OPEN_EVENT = 'opsboard-single-select-open';

export function SingleSelect<T extends string>({
  options,
  value,
  onChange,
  placeholder = 'Select...',
}: SingleSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedLabel = useMemo(() => {
    return options.find((option) => option.value === value)?.label ?? placeholder;
  }, [options, placeholder, value]);

  function handleToggleDropdown() {
    if (!isOpen) {
      window.dispatchEvent(new Event(SELECT_OPEN_EVENT));
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }

  function handleOptionSelect(optionValue: T) {
    onChange(optionValue);
    setIsOpen(false);
  }

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useDropdownDismiss({
    rootRef,
    isOpen,
    onClose: handleClose,
    closeOnOpenEventName: SELECT_OPEN_EVENT,
  });

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggleDropdown}
        aria-expanded={isOpen}
      >
        <span className={styles.value}>{selectedLabel}</span>
        <span className={styles.chevron}>{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen ? (
        <div className={styles.dropdown}>
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                className={isSelected ? `${styles.option} ${styles.optionSelected}` : styles.option}
                onClick={() => handleOptionSelect(option.value)}
              >
                <span className={styles.optionLabel}>{option.label}</span>
                {isSelected ? <span className={styles.optionCheck}>✓</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
