'use client';

import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from '../styles/Dropdown.module.css';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
}

export default function Dropdown({
  options,
  placeholder = 'Select an option',
  onSelect,
  defaultValue,
  disabled = false,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(
    defaultValue
      ? options.find((opt) => opt.value === defaultValue) || null
      : null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setOpen(false);
    onSelect?.(option.value);
  };

  return (
    <div
      className={`relative inline-block text-left w-52 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={styles.dropdownButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selected?.label || placeholder}</span>
        <FiChevronDown className="ml-2" />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-md">
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-sm"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
