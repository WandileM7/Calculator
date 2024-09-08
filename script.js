// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero!";
    }
    return a / b;
}

// Variables for calculator operation
let firstNumber = null;
let operator = null;
let newInputStarted = false;

// Operate function
function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Error: Invalid operator";
    }
}

// Update display
function updateDisplay(value) {
    const display = document.querySelector('.display');
    display.textContent = value;
}

// Handle number input
function inputNumber(num) {
    const currentDisplay = document.querySelector('.display').textContent;
    if (newInputStarted) {
        updateDisplay(num);
        newInputStarted = false;
    } else {
        updateDisplay(currentDisplay === '0' ? num : currentDisplay + num);
    }
}

// Handle operator input
function inputOperator(newOperator) {
    const currentValue = parseFloat(document.querySelector('.display').textContent);

    if (firstNumber === null) {
        firstNumber = currentValue;
    } else if (operator) {
        const result = operate(operator, firstNumber, currentValue);
        updateDisplay(Math.round(result * 1000000) / 1000000); // Round to 6 decimal places
        firstNumber = result;
    }

    newInputStarted = true;
    operator = newOperator;
}

// Calculate result
function calculate() {
    const currentValue = parseFloat(document.querySelector('.display').textContent);

    if (firstNumber !== null && operator) {
        const result = operate(operator, firstNumber, currentValue);
        updateDisplay(Math.round(result * 1000000) / 1000000); // Round to 6 decimal places
        firstNumber = null;
        operator = null;
        newInputStarted = true;
    }
}

// Clear calculator
function clearCalculator() {
    firstNumber = null;
    operator = null;
    newInputStarted = false;
    updateDisplay('0');
}

// Handle decimal input
function inputDecimal() {
    const currentDisplay = document.querySelector('.display').textContent;
    if (!currentDisplay.includes('.')) {
        updateDisplay(currentDisplay + '.');
        newInputStarted = false;
    }
}

// Handle backspace
function backspace() {
    const currentDisplay = document.querySelector('.display').textContent;
    if (currentDisplay.length > 1) {
        updateDisplay(currentDisplay.slice(0, -1));
    } else {
        updateDisplay('0');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operator');
    const equals = document.querySelector('.equals');
    const clear = document.querySelector('.clear');
    const decimal = document.querySelector('.decimal');
    const backspaceBtn = document.querySelector('.backspace');

    numbers.forEach(button => {
        button.addEventListener('click', () => inputNumber(button.textContent));
    });

    operators.forEach(button => {
        button.addEventListener('click', () => inputOperator(button.textContent));
    });

    equals.addEventListener('click', calculate);
    clear.addEventListener('click', clearCalculator);
    decimal.addEventListener('click', inputDecimal);
    backspaceBtn.addEventListener('click', backspace);

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        if (event.key >= '0' && event.key <= '9') inputNumber(event.key);
        if (event.key === '.') inputDecimal();
        if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') inputOperator(event.key);
        if (event.key === 'Enter') calculate();
        if (event.key === 'Escape') clearCalculator();
        if (event.key === 'Backspace') backspace();
    });
});