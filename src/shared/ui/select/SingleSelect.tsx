import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './SingleSelect.module.css';
import type { SingleSelectProps } from './types';

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

  function handleOptionSelect(optionValue: T) {
    onChange(optionValue);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
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
