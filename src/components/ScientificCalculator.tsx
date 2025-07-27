import { CalculatorButton } from '@/components/CalculatorButton';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { Badge } from '@/components/ui/badge';

export const ScientificCalculator = () => {
  const {
    inputDigit,
    inputOperation,
    calculate,
    clear,
    clearEntry,
    inputDecimal,
    toggleSign,
    percentage,
    sqrt,
    square,
    reciprocal,
    sin,
    cos,
    tan,
    log,
    ln,
    factorial,
    power,
    memoryStore,
    memoryRecall,
    memoryClear,
    memoryAdd,
    memorySubtract,
    toggleAngleUnit,
    isRadians,
    memory
  } = useCalculatorStore();

  return (
    <div className="p-6 space-y-4">
      {/* Memory and angle unit indicators */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {memory !== 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              M: {memory}
            </Badge>
          )}
        </div>
        <Badge 
          variant={isRadians ? "default" : "secondary"}
          className={isRadians ? "bg-green-600" : "bg-gray-600"}
        >
          {isRadians ? 'RAD' : 'DEG'}
        </Badge>
      </div>

      {/* Scientific functions */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <CalculatorButton onClick={toggleAngleUnit} variant="function" className="text-sm">
          {isRadians ? 'RAD' : 'DEG'}
        </CalculatorButton>
        <CalculatorButton onClick={sin} variant="function" className="text-sm">
          sin
        </CalculatorButton>
        <CalculatorButton onClick={cos} variant="function" className="text-sm">
          cos
        </CalculatorButton>
        <CalculatorButton onClick={tan} variant="function" className="text-sm">
          tan
        </CalculatorButton>
        <CalculatorButton onClick={factorial} variant="function" className="text-sm">
          n!
        </CalculatorButton>

        <CalculatorButton onClick={() => inputDigit(Math.PI.toString())} variant="function" className="text-sm">
          π
        </CalculatorButton>
        <CalculatorButton onClick={log} variant="function" className="text-sm">
          log
        </CalculatorButton>
        <CalculatorButton onClick={ln} variant="function" className="text-sm">
          ln
        </CalculatorButton>
        <CalculatorButton onClick={power} variant="function" className="text-sm">
          x^y
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit(Math.E.toString())} variant="function" className="text-sm">
          e
        </CalculatorButton>
      </div>

      {/* Memory functions */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <CalculatorButton onClick={memoryClear} variant="function" className="text-sm">
          MC
        </CalculatorButton>
        <CalculatorButton onClick={memoryRecall} variant="function" className="text-sm">
          MR
        </CalculatorButton>
        <CalculatorButton onClick={memoryStore} variant="function" className="text-sm">
          MS
        </CalculatorButton>
        <CalculatorButton onClick={memoryAdd} variant="function" className="text-sm">
          M+
        </CalculatorButton>
        <CalculatorButton onClick={memorySubtract} variant="function" className="text-sm">
          M-
        </CalculatorButton>
      </div>

      {/* Main calculator grid */}
      <div className="grid grid-cols-5 gap-2">
        {/* Row 1 */}
        <CalculatorButton onClick={square} variant="function" className="text-sm">
          x²
        </CalculatorButton>
        <CalculatorButton onClick={sqrt} variant="function" className="text-sm">
          √x
        </CalculatorButton>
        <CalculatorButton onClick={reciprocal} variant="function" className="text-sm">
          1/x
        </CalculatorButton>
        <CalculatorButton onClick={clearEntry} variant="clear">
          CE
        </CalculatorButton>
        <CalculatorButton onClick={clear} variant="clear">
          C
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={percentage} variant="function">
          %
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('7')}>
          7
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('8')}>
          8
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('9')}>
          9
        </CalculatorButton>
        <CalculatorButton onClick={() => inputOperation('÷')} variant="operator">
          ÷
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={toggleSign} variant="function">
          ±
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('4')}>
          4
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('5')}>
          5
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('6')}>
          6
        </CalculatorButton>
        <CalculatorButton onClick={() => inputOperation('×')} variant="operator">
          ×
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputDigit('(')} variant="function">
          (
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('1')}>
          1
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('2')}>
          2
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('3')}>
          3
        </CalculatorButton>
        <CalculatorButton onClick={() => inputOperation('-')} variant="operator">
          −
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton onClick={() => inputDigit(')')} variant="function">
          )
        </CalculatorButton>
        <CalculatorButton onClick={() => inputDigit('0')} className="col-span-2">
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>
          .
        </CalculatorButton>
        <CalculatorButton onClick={() => inputOperation('+')} variant="operator">
          +
        </CalculatorButton>

        {/* Equals button */}
        <CalculatorButton onClick={calculate} variant="equals" className="col-span-5">
          =
        </CalculatorButton>
      </div>
    </div>
  );
};