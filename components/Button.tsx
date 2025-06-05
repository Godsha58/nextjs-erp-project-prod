'use client';

import styles from '../styles/Button.module.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ label, onClick, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {label}
    </button>
  );
}
