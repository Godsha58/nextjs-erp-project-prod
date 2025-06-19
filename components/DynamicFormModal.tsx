'use client';

import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
interface DynamicFormModalProps {
  title: string;
  fields: Field[];
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: Record<string, any>) => void;
}

export type Field = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'switch';
  options?: { label: string; value: string }[];
};

export default function DynamicFormModal({
  title,
  fields,
  isOpen,
  onClose,
  onSubmit,
}: DynamicFormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Bloquear scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Cerrar por clic fuera
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({});
    onClose();
  };

  // Portal root
  if (typeof window === 'undefined') return null;
  const container = document.getElementById('modal-root');
  if (!isOpen || !container) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[#a01217] mb-4">{title}</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {fields.map(field => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm font-medium">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={e => handleChange(field.name, e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="">Select an option</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : field.type === 'switch' ? (
                <input
                  type="checkbox"
                  checked={formData[field.name] || false}
                  onChange={e => handleChange(field.name, e.target.checked)}
                  className="w-5 h-5"
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={e => handleChange(field.name, e.target.value)}
                  className="border rounded px-3 py-2"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button label="Cancel" onClick={onClose} />
          <Button label="Save" onClick={handleSubmit} />
        </div>
      </div>
    </div>,
    container
  );
}
