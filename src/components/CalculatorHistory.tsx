import { motion, AnimatePresence } from 'framer-motion';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface CalculatorHistoryProps {
  isOpen: boolean;
}

export const CalculatorHistory = ({ isOpen }: CalculatorHistoryProps) => {
  const { history, clearHistory } = useCalculatorStore();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 border-t"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">History</h3>
          </div>
          {history.length > 0 && (
            <Button
              onClick={clearHistory}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <ScrollArea className="h-64">
          {history.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No calculations yet</p>
              <p className="text-sm">Your calculation history will appear here</p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {history.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Card className="p-3 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">
                            {entry.expression}
                          </div>
                          <div className="text-lg font-semibold text-gray-800">
                            = {entry.result}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 ml-2">
                          {format(entry.timestamp, 'HH:mm')}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </div>
    </motion.div>
  );
};