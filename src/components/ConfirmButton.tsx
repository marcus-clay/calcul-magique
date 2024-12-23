import React from 'react';
import { CheckCircle } from 'lucide-react';

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onConfirm, disabled }) => {
  return (
    <button
      onClick={onConfirm}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 
        px-8 py-4 text-xl font-medium rounded-xl
        transform transition-all duration-200
        ${disabled 
          ? 'bg-gray-100 cursor-not-allowed opacity-50' 
          : 'bg-[#189518] hover:bg-[#189518]/90 text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }
      `}
    >
      <CheckCircle className="w-6 h-6 text-white" />
      <span>Vérifier</span>
    </button>
  );
};