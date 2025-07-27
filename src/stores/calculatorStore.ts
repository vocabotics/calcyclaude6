import { create } from 'zustand';

type CalculatorMode = 'standard' | 'scientific';

type CalculationHistory = {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
};

type CalculatorState = {
  display: string;
  previousValue: string;
  operation: string | null;
  waitingForOperand: boolean;
  mode: CalculatorMode;
  history: CalculationHistory[];
  memory: number;
  isRadians: boolean;
};

type CalculatorActions = {
  inputDigit: (digit: string) => void;
  inputOperation: (nextOperation: string) => void;
  calculate: () => void;
  clear: () => void;
  clearEntry: () => void;
  inputDecimal: () => void;
  toggleSign: () => void;
  percentage: () => void;
  sqrt: () => void;
  square: () => void;
  reciprocal: () => void;
  sin: () => void;
  cos: () => void;
  tan: () => void;
  log: () => void;
  ln: () => void;
  factorial: () => void;
  power: () => void;
  setMode: (mode: CalculatorMode) => void;
  addToHistory: (expression: string, result: string) => void;
  clearHistory: () => void;
  memoryStore: () => void;
  memoryRecall: () => void;
  memoryClear: () => void;
  memoryAdd: () => void;
  memorySubtract: () => void;
  toggleAngleUnit: () => void;
};

const performCalculation = (firstOperand: number, secondOperand: number, operation: string): number => {
  switch (operation) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '×':
      return firstOperand * secondOperand;
    case '÷':
      return secondOperand !== 0 ? firstOperand / secondOperand : 0;
    case '^':
      return Math.pow(firstOperand, secondOperand);
    default:
      return secondOperand;
  }
};

const factorial = (n: number): number => {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

export const useCalculatorStore = create<CalculatorState & CalculatorActions>((set, get) => ({
  display: '0',
  previousValue: '',
  operation: null,
  waitingForOperand: false,
  mode: 'standard',
  history: [],
  memory: 0,
  isRadians: true,

  inputDigit: (digit: string) => {
    const { display, waitingForOperand } = get();
    
    if (waitingForOperand) {
      set({ display: digit, waitingForOperand: false });
    } else {
      set({ display: display === '0' ? digit : display + digit });
    }
  },

  inputOperation: (nextOperation: string) => {
    const { display, previousValue, operation, waitingForOperand } = get();
    const inputValue = parseFloat(display);

    if (previousValue === '') {
      set({ previousValue: display });
    } else if (operation && !waitingForOperand) {
      const currentValue = parseFloat(previousValue);
      const newValue = performCalculation(currentValue, inputValue, operation);
      
      set({
        display: String(newValue),
        previousValue: String(newValue)
      });
    }

    set({
      waitingForOperand: true,
      operation: nextOperation
    });
  },

  calculate: () => {
    const { display, previousValue, operation } = get();
    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);

    if (previousValue !== '' && operation) {
      const newValue = performCalculation(currentValue, inputValue, operation);
      const expression = `${previousValue} ${operation} ${display}`;
      
      get().addToHistory(expression, String(newValue));
      
      set({
        display: String(newValue),
        previousValue: '',
        operation: null,
        waitingForOperand: true
      });
    }
  },

  clear: () => {
    set({
      display: '0',
      previousValue: '',
      operation: null,
      waitingForOperand: false
    });
  },

  clearEntry: () => {
    set({ display: '0' });
  },

  inputDecimal: () => {
    const { display, waitingForOperand } = get();
    
    if (waitingForOperand) {
      set({ display: '0.', waitingForOperand: false });
    } else if (display.indexOf('.') === -1) {
      set({ display: display + '.' });
    }
  },

  toggleSign: () => {
    const { display } = get();
    if (display !== '0') {
      set({ display: display.charAt(0) === '-' ? display.substr(1) : '-' + display });
    }
  },

  percentage: () => {
    const { display } = get();
    const value = parseFloat(display);
    set({ display: String(value / 100) });
  },

  sqrt: () => {
    const { display } = get();
    const value = parseFloat(display);
    const result = Math.sqrt(value);
    get().addToHistory(`√(${display})`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  square: () => {
    const { display } = get();
    const value = parseFloat(display);
    const result = value * value;
    get().addToHistory(`${display}²`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  reciprocal: () => {
    const { display } = get();
    const value = parseFloat(display);
    const result = value !== 0 ? 1 / value : 0;
    get().addToHistory(`1/(${display})`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  sin: () => {
    const { display, isRadians } = get();
    const value = parseFloat(display);
    const angle = isRadians ? value : toRadians(value);
    const result = Math.sin(angle);
    get().addToHistory(`sin(${display})`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  cos: () => {
    const { display, isRadians } = get();
    const value = parseFloat(display);
    const angle = isRadians ? value : toRadians(value);
    const result = Math.cos(angle);
    get().addToHistory(`cos(${display})`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  tan: () => {
    const { display, isRadians } = get();
    const value = parseFloat(display);
    const angle = isRadians ? value : toRadians(value);
    const result = Math.tan(angle);
    get().addToHistory(`tan(${display})`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  log: () => {
    const { display } = get();
    const value = parseFloat(display);
    const result = Math.log10(value);
    get().addToHistory(`log(${display})`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  ln: () => {
    const { display } = get();
    const value = parseFloat(display);
    const result = Math.log(value);
    get().addToHistory(`ln(${display})`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  factorial: () => {
    const { display } = get();
    const value = parseFloat(display);
    const result = factorial(value);
    get().addToHistory(`${display}!`, String(result));
    set({ display: String(result), waitingForOperand: true });
  },

  power: () => {
    get().inputOperation('^');
  },

  setMode: (mode: CalculatorMode) => {
    set({ mode });
  },

  addToHistory: (expression: string, result: string) => {
    const { history } = get();
    const newEntry = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: new Date()
    };
    set({ history: [newEntry, ...history.slice(0, 49)] }); // Keep last 50 entries
  },

  clearHistory: () => {
    set({ history: [] });
  },

  memoryStore: () => {
    const { display } = get();
    set({ memory: parseFloat(display) });
  },

  memoryRecall: () => {
    const { memory } = get();
    set({ display: String(memory), waitingForOperand: true });
  },

  memoryClear: () => {
    set({ memory: 0 });
  },

  memoryAdd: () => {
    const { display, memory } = get();
    set({ memory: memory + parseFloat(display) });
  },

  memorySubtract: () => {
    const { display, memory } = get();
    set({ memory: memory - parseFloat(display) });
  },

  toggleAngleUnit: () => {
    const { isRadians } = get();
    set({ isRadians: !isRadians });
  }
}));