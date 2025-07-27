import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonVariant = 'number' | 'operator' | 'function' | 'equals' | 'clear';

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'number':
      return 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600';
    case 'operator':
      return 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500';
    case 'function':
      return 'bg-gray-600 hover:bg-gray-500 text-white border-gray-500';
    case 'equals':
      return 'bg-green-600 hover:bg-green-500 text-white border-green-500';
    case 'clear':
      return 'bg-red-600 hover:bg-red-500 text-white border-red-500';
    default:
      return 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600';
  }
};

export const CalculatorButton = ({
  children,
  onClick,
  variant = 'number',
  className,
  disabled = false
}: CalculatorButtonProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'h-14 md:h-16 text-lg md:text-xl font-medium border-2 transition-all duration-200',
          getButtonStyles(variant),
          className
        )}
      >
        {children}
      </Button>
    </motion.div>
  );
};