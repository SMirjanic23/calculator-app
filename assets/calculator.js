const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  display.value = calculator.displayValue;
}

// updateDisplay();

keys.addEventListener('click', (event) => {
  const btn = event.target;

  if (!btn.matches('button')) {
    return;
  }

  if (btn.classList.contains('operator')) {
    handleOperator(btn.value);
    updateDisplay();
    return;
  }

  if (btn.classList.contains('decimal')) {
    inputDecimal(btn.value);
    updateDisplay();
    return;
  }

  if (btn.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(btn.value);
  updateDisplay();
});
