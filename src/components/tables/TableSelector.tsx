import React from 'react';
import { motion } from 'framer-motion';

interface TableSelectorProps {
  onSelect: (table: number) => void;
}

export const TableSelector: React.FC<TableSelectorProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((table) => (
        <motion.button
          key={table}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: table * 0.1 }}
          onClick={() => onSelect(table)}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
            transform hover:scale-105 transition-all duration-200"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-[#334ED6] mb-2">
              {table}
            </div>
            <div className="text-sm text-gray-600">
              Table de {table}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};