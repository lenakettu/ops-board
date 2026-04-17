import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './MultiSelect.module.css';
import type { MultiSelectProps } from './types';

export function MultiSelect<T extends string>({
  options,
  value,
  onChange,
  placeholder,
}: MultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedLabels = useMemo(() => {
    return options.filter((option) => value.includes(option.value)).map((option) => option.label);
  }, [options, value]);

  function handleToggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function handleOptionToggle(optionValue: T) {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
      return;
    }

    onChange([...value, optionValue]);
  }

  function handleClear() {
    onChange([]);
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

  const triggerLabel =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length <= 2
        ? selectedLabels.join(', ')
        : `${selectedLabels.length} selected`;

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggleDropdown}
        aria-expanded={isOpen}
      >
        <span className={value.length === 0 ? styles.placeholder : styles.value}>
          {triggerLabel}
        </span>

        <span className={styles.actions}>
          {value.length > 0 ? (
            <button
              type="button"
              className={styles.clear}
              onClick={(event) => {
                event.stopPropagation();
                handleClear();
              }}
              aria-label="Clear selection"
            >
              ×
            </button>
          ) : null}

          <span className={styles.chevron}>{isOpen ? '▴' : '▾'}</span>
        </span>
      </button>

      {isOpen ? (
        <div className={styles.dropdown}>
          {options.map((option) => {
            const isSelected = value.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                className={isSelected ? `${styles.option} ${styles.optionSelected}` : styles.option}
                onClick={() => handleOptionToggle(option.value)}
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
