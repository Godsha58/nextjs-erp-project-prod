'use client';

import Button from './Button';
import { ReactNode } from 'react';

interface CardProps {
  label: string;
  buttonLabel: string | ReactNode;
  onButtonClick?: () => void;
  className?: string;
}

export default function Card({ label, buttonLabel, onButtonClick, className = '' }: CardProps) {
  return (
    <div
      className={`p-6 w-full max-w-sm transition cursor-pointer text-[#a01217] bg-[#a0121722] rounded-xl hover:bg-[#a0121744] ${className}`}
    >
      <h2 className="text-lg font-semibold mb-4">{label}</h2>
      <Button
        label={buttonLabel}
        onClick={onButtonClick}
        className="bg-white text-[#a01217] px-4 py-2 rounded hover:bg-gray-100 transition"
      />
    </div>
  );
}
