import { motion } from 'framer-motion';
import { useCalculatorStore } from '@/stores/calculatorStore';

export const CalculatorDisplay = () => {
  const { display, previousValue, operation } = useCalculatorStore();

  return (
    <div className="bg-gray-900 text-white p-6 rounded-t-xl">
      <div className="text-right">
        {/* Previous calculation */}
        {previousValue && operation && (
          <motion.div 
            className="text-gray-400 text-sm mb-1 h-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {previousValue} {operation}
          </motion.div>
        )}
        
        {/* Current display */}
        <motion.div 
          className="text-4xl md:text-5xl font-light min-h-[3rem] flex items-center justify-end overflow-hidden"
          key={display}
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {display.length > 12 ? (
            <span className="text-2xl">{display}</span>
          ) : (
            display
          )}
        </motion.div>
      </div>
    </div>
  );
};