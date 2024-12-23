import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowLeft } from 'lucide-react';
import { HintModal } from './HintModal';
import { SolutionModal } from './SolutionModal';
import { soundManager } from '../../utils/soundManager';

interface PracticeAreaProps {
  table: number;
  onScoreUpdate: (score: { correct: number; total: number }) => void;
  onBack: () => void;
}

export const PracticeArea: React.FC<PracticeAreaProps> = ({ 
  table, 
  onScoreUpdate,
  onBack 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, [table]);

  const generateQuestion = () => {
    const multiplier = Math.floor(Math.random() * 10) + 1;
    setCurrentQuestion(multiplier);
    setUserAnswer('');
    setFeedback(null);
  };

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    const correct = answer === (table * currentQuestion!);
    
    if (correct) {
      soundManager.playSuccess();
      onScoreUpdate(prev => ({ 
        correct: prev.correct + 1, 
        total: prev.total + 1 
      }));
    } else {
      soundManager.playError();
      onScoreUpdate(prev => ({ 
        ...prev, 
        total: prev.total + 1 
      }));
    }
    
    setFeedback(correct ? 'correct' : 'incorrect');
    
    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer) {
      handleSubmit();
    }
    if (e.key === 'Escape') {
      setShowHint(false);
      setShowSolution(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-xl">
      <div className="text-center space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Changer de table</span>
          </button>
          <h2 className="text-3xl font-bold text-gray-900">
            Table de {table}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
            >
              Indice
            </button>
            <button
              onClick={() => setShowSolution(true)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Solution
            </button>
          </div>
        </div>

        <div className="text-4xl font-bold space-x-4">
          <span>{table}</span>
          <span className="text-purple-600">×</span>
          <span>{currentQuestion}</span>
          <span className="text-purple-600">=</span>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-32 text-center border-b-4 border-purple-200 focus:border-purple-400 
              focus:outline-none bg-transparent text-4xl"
            placeholder="?"
          />
        </div>

        {feedback && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full
              ${feedback === 'correct' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
              }`}
          >
            {feedback === 'correct' ? (
              <Check className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
            <span className="font-medium">
              {feedback === 'correct' 
                ? 'Bravo !' 
                : `La réponse était ${table * currentQuestion!}`
              }
            </span>
          </motion.div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!userAnswer}
          className={`
            px-8 py-4 rounded-xl text-xl font-medium
            transform transition-all duration-200
            ${!userAnswer 
              ? 'bg-gray-100 cursor-not-allowed opacity-50' 
              : 'bg-[#189518] text-white hover:bg-[#189518]/90 hover:scale-105'
            }
          `}
        >
          Vérifier
        </button>
      </div>

      {showHint && (
        <HintModal 
          table={table} 
          multiplier={currentQuestion!}
          onClose={() => setShowHint(false)}
        />
      )}

      {showSolution && (
        <SolutionModal
          table={table}
          multiplier={currentQuestion!}
          onClose={() => setShowSolution(false)}
        />
      )}
    </div>
  );
};