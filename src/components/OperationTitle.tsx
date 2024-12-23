import React from 'react';

interface OperationTitleProps {
  operation: string;
}

export const OperationTitle: React.FC<OperationTitleProps> = ({ operation }) => {
  const getTitle = () => {
    switch (operation) {
      case '+': return 'Addition';
      case '-': return 'Soustraction';
      case 'x': return 'Multiplication';
      case '÷': return 'Division';
      default: return 'Opération';
    }
  };

  return (
    <div className="macos-window px-4 py-2 rounded-lg inline-flex">
      <h2 className="text-xl font-semibold text-gray-900">
        {getTitle()}
      </h2>
    </div>
  );
};