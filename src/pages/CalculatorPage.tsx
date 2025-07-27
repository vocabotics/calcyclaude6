import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { CalculatorDisplay } from '@/components/CalculatorDisplay';
import { StandardCalculator } from '@/components/StandardCalculator';
import { ScientificCalculator } from '@/components/ScientificCalculator';
import { CalculatorHistory } from '@/components/CalculatorHistory';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { Card } from '@/components/ui/card';

export const CalculatorPage = () => {
  const { mode } = useCalculatorStore();
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => setShowHistory(!showHistory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation showHistory={showHistory} onToggleHistory={toggleHistory} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {mode === 'scientific' ? 'Scientific Calculator' : 'Standard Calculator'}
            </h2>
            <p className="text-gray-600 text-lg">
              {mode === 'scientific' 
                ? 'Advanced mathematical functions and operations for complex calculations'
                : 'Simple and intuitive calculator for everyday calculations'
              }
            </p>
          </motion.div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              <CalculatorDisplay />
              {mode === 'scientific' ? <ScientificCalculator /> : <StandardCalculator />}
            </Card>
          </motion.div>

          {/* History */}
          <CalculatorHistory isOpen={showHistory} />

          {/* Features */}
          <motion.div 
            className="mt-12 grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Key Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Standard & Scientific modes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Calculation history
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Memory functions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Trigonometric functions
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">How to Use</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Switch modes:</strong> Use the toggle buttons to switch between Standard and Scientific calculators
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong>View history:</strong> Click the History button to see your recent calculations
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Memory functions:</strong> Use MS, MR, MC, M+, M- for memory operations in Scientific mode
                  </div>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};