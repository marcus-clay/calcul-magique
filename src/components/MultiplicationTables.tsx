import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Table } from 'lucide-react';
import { TableSelector } from './tables/TableSelector';
import { PracticeArea } from './tables/PracticeArea';
import { ScoreDisplay } from './tables/ScoreDisplay';
import { soundManager } from '../utils/soundManager';

interface MultiplicationTablesProps {
  onBack: () => void;
}

export const MultiplicationTables: React.FC<MultiplicationTablesProps> = ({ onBack }) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  return (
    <div className="min-h-screen bg-[#334ED6] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour au menu</span>
          </button>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
            <Table className="w-6 h-6 text-[#334ED6]" />
            <h1 className="text-xl font-bold text-[#334ED6]">
              Tables de Multiplication
            </h1>
          </div>
        </div>

        {!selectedTable ? (
          <TableSelector onSelect={setSelectedTable} />
        ) : (
          <div className="space-y-6">
            <ScoreDisplay score={score} />
            <PracticeArea 
              table={selectedTable}
              onScoreUpdate={setScore}
              onBack={() => setSelectedTable(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};