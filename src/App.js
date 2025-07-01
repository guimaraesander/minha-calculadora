import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  
  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  
  const clearAll = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  
  const calculate = {
    '/': (first, second) => first / second,
    '*': (first, second) => first * second,
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    '=': (first, second) => second,
  };

 
  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && previousValue !== null) {
      const result = calculate[operator](previousValue, inputValue);
      setDisplayValue(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(inputValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);

    if (nextOperator === '=') {
       if (operator && previousValue !== null) {
          const result = calculate[operator](previousValue, inputValue);
          setDisplayValue(String(result));
          setPreviousValue(null);
          setOperator(null);
          setWaitingForOperand(true);
       }
    }
  };

 
  return (
    <div className="calculator">
      
      <div className="display">{displayValue}</div>

      <div className="keypad">
        
        <button onClick={clearAll} className="key function">AC</button>
        <button className="key function">±</button>
        <button className="key function">%</button>
        <button onClick={() => performOperation('/')} className="key operator">÷</button>

        <button onClick={() => inputDigit(7)} className="key">7</button>
        <button onClick={() => inputDigit(8)} className="key">8</button>
        <button onClick={() => inputDigit(9)} className="key">9</button>
        <button onClick={() => performOperation('*')} className="key operator">×</button>

        <button onClick={() => inputDigit(4)} className="key">4</button>
        <button onClick={() => inputDigit(5)} className="key">5</button>
        <button onClick={() => inputDigit(6)} className="key">6</button>
        <button onClick={() => performOperation('-')} className="key operator">−</button>

        <button onClick={() => inputDigit(1)} className="key">1</button>
        <button onClick={() => inputDigit(2)} className="key">2</button>
        <button onClick={() => inputDigit(3)} className="key">3</button>
        <button onClick={() => performOperation('+')} className="key operator">+</button>

        <button onClick={() => inputDigit(0)} className="key zero">0</button>
        <button onClick={inputDecimal} className="key">.</button>
        <button onClick={() => performOperation('=')} className="key operator">=</button>
      </div>
    </div>
  );
}

export default App;