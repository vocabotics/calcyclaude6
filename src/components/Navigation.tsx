import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { Calculator, FlaskConical, History, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  showHistory: boolean;
  onToggleHistory: () => void;
}

export const Navigation = ({ showHistory, onToggleHistory }: NavigationProps) => {
  const { mode, setMode, history } = useCalculatorStore();

  return (
    <motion.nav 
      className="bg-white shadow-lg border-b"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Advanced Calculator</h1>
          </motion.div>

          {/* Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setMode('standard')}
              variant={mode === 'standard' ? 'default' : 'outline'}
              size="sm"
              className="flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Standard
            </Button>
            <Button
              onClick={() => setMode('scientific')}
              variant={mode === 'scientific' ? 'default' : 'outline'}
              size="sm"
              className="flex items-center gap-2"
            >
              <FlaskConical className="h-4 w-4" />
              Scientific
            </Button>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={onToggleHistory}
              variant="outline"
              size="sm"
              className="relative flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              History
              {history.length > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-blue-600 text-white"
                >
                  {history.length > 99 ? '99+' : history.length}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};