class ScientificCalculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.pendingFunction = null;
        this.shouldResetDisplay = false;
        this.expression = '';  // Store complete expression
        this.angleMode = 'deg';
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.pendingFunction = null;
        this.shouldResetDisplay = false;
        this.expression = '';  // Clear expression
    }

    delete() {
        if (this.currentOperand === '0' || this.currentOperand === 'Error') return;
        
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
        
        // Update expression by removing last character
        if (this.expression.length > 0) {
            this.expression = this.expression.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentOperand = '0';
            this.shouldResetDisplay = false;
            this.expression = '';
        }
        
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0') {
            this.currentOperand = number === '.' ? '0.' : number;
        } else {
            this.currentOperand += number;
        }
        
        // Update expression
        this.expression += number;
    }

    chooseOperation(operation) {
        if (this.shouldResetDisplay) {
            this.shouldResetDisplay = false;
        }
        
        if (this.currentOperand === 'Error') return;
        
        // Add operation to expression
        this.expression += operation;
        
        // Show the building expression in previous operand
        this.previousOperand = this.expression;
        this.currentOperand = '0';
        this.operation = operation;
    }

    // New method to evaluate expression following BODMAS
    evaluateExpression(expr) {
        try {
            // Remove any spaces
            expr = expr.replace(/\s/g, '');
            
            // Handle scientific functions first
            expr = this.processScientificFunctions(expr);
            
            // Evaluate the expression following order of operations
            return this.parseExpression(expr);
        } catch (error) {
            this.showError('Invalid Expression');
            return null;
        }
    }

    // Process scientific functions in the expression
    processScientificFunctions(expr) {
        const functions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'cbrt', 'exp'];
        
        for (let func of functions) {
            const regex = new RegExp(`${func}\\(([^)]+)\\)`, 'g');
            expr = expr.replace(regex, (match, operand) => {
                const result = this.evaluateFunction(func, operand);
                return result !== null ? result.toString() : match;
            });
        }
        
        return expr;
    }

    // Parse expression following BODMAS (Brackets, Orders, Division/Multiplication, Addition/Subtraction)
    parseExpression(expr) {
        // Handle brackets first
        while (expr.includes('(')) {
            const innermost = this.getInnermostBrackets(expr);
            if (innermost) {
                const result = this.parseExpression(innermost.content);
                expr = expr.replace(innermost.full, result.toString());
            } else {
                break;
            }
        }
        
        // Handle exponentiation (^)
        expr = this.handleOperation(expr, ['^'], (a, b) => Math.pow(a, b));
        
        // Handle multiplication and division (left to right)
        expr = this.handleOperation(expr, ['*', '/', '%'], (a, b, op) => {
            if (op === '*') return a * b;
            if (op === '/') {
                if (b === 0) throw new Error('Division by zero');
                return a / b;
            }
            if (op === '%') return a % b;
        });
        
        // Handle addition and subtraction (left to right)
        expr = this.handleOperation(expr, ['+', '-'], (a, b, op) => {
            if (op === '+') return a + b;
            if (op === '-') return a - b;
        });
        
        return parseFloat(expr);
    }

    // Helper method to find innermost brackets
    getInnermostBrackets(expr) {
        let start = -1;
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] === '(') {
                start = i;
            } else if (expr[i] === ')' && start !== -1) {
                return {
                    full: expr.substring(start, i + 1),
                    content: expr.substring(start + 1, i)
                };
            }
        }
        return null;
    }

    // Helper method to handle operations with precedence
    handleOperation(expr, operators, calculator) {
        const tokens = this.tokenize(expr);
        
        while (true) {
            let found = false;
            for (let i = 1; i < tokens.length - 1; i += 2) {
                if (operators.includes(tokens[i])) {
                    const left = parseFloat(tokens[i - 1]);
                    const right = parseFloat(tokens[i + 1]);
                    const operator = tokens[i];
                    
                    if (isNaN(left) || isNaN(right)) continue;
                    
                    const result = calculator(left, right, operator);
                    tokens.splice(i - 1, 3, result.toString());
                    found = true;
                    break;
                }
            }
            if (!found) break;
        }
        
        return tokens.join('');
    }

    // Tokenize expression into numbers and operators
    tokenize(expr) {
        const tokens = [];
        let current = '';
        
        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];
            if (['+', '-', '*', '/', '^', '%'].includes(char)) {
                if (current) {
                    tokens.push(current);
                    current = '';
                }
                tokens.push(char);
            } else {
                current += char;
            }
        }
        
        if (current) tokens.push(current);
        return tokens;
    }

    compute() {
        if (this.operation === 'function') {
            this.evaluatePendingFunction();
            return;
        }
        
        if (!this.expression) return;
        
        // Evaluate the complete expression
        const result = this.evaluateExpression(this.expression);
        
        if (result !== null) {
            this.currentOperand = this.formatResult(result);
            this.previousOperand = this.expression + ' =';
            this.expression = this.currentOperand;
            this.operation = null;
            this.shouldResetDisplay = true;
        }
    }

    computeScientificFunction(func) {
        if (this.currentOperand === '' || this.currentOperand === '0') return;
        
        const functionExpression = `${func}(${this.currentOperand})`;
        
        this.pendingFunction = {
            func: func,
            operand: this.currentOperand
        };
        
        this.previousOperand = functionExpression;
        this.currentOperand = '';
        this.operation = 'function';
    }

    evaluatePendingFunction() {
        if (!this.pendingFunction) return;
        
        const result = this.evaluateFunction(this.pendingFunction.func, this.pendingFunction.operand);
        
        if (result !== null) {
            this.currentOperand = this.formatResult(result);
            this.previousOperand = '';
            this.operation = null;
            this.pendingFunction = null;
            this.shouldResetDisplay = true;
        }
    }

    evaluateFunction(func, operand) {
        const current = parseFloat(operand);
        if (isNaN(current)) return null;
        
        let result;
        
        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(this.angleMode === 'deg' ? current * Math.PI / 180 : current);
                    break;
                case 'cos':
                    result = Math.cos(this.angleMode === 'deg' ? current * Math.PI / 180 : current);
                    break;
                case 'tan':
                    result = Math.tan(this.angleMode === 'deg' ? current * Math.PI / 180 : current);
                    break;
                case 'asin':
                    if (current < -1 || current > 1) {
                        this.showError('Invalid input for arcsin');
                        return null;
                    }
                    result = Math.asin(current);
                    if (this.angleMode === 'deg') result = result * 180 / Math.PI;
                    break;
                case 'acos':
                    if (current < -1 || current > 1) {
                        this.showError('Invalid input for arccos');
                        return null;
                    }
                    result = Math.acos(current);
                    if (this.angleMode === 'deg') result = result * 180 / Math.PI;
                    break;
                case 'atan':
                    result = Math.atan(current);
                    if (this.angleMode === 'deg') result = result * 180 / Math.PI;
                    break;
                case 'log':
                    if (current <= 0) {
                        this.showError('Invalid input for logarithm');
                        return null;
                    }
                    result = Math.log10(current);
                    break;
                case 'ln':
                    if (current <= 0) {
                        this.showError('Invalid input for natural logarithm');
                        return null;
                    }
                    result = Math.log(current);
                    break;
                case 'exp':
                    result = Math.exp(current);
                    break;
                case 'sqrt':
                    if (current < 0) {
                        this.showError('Cannot compute square root of negative number');
                        return null;
                    }
                    result = Math.sqrt(current);
                    break;
                case 'cbrt':
                    result = Math.cbrt(current);
                    break;
                case 'square':
                    result = current * current;
                    break;
                case 'reciprocal':
                    if (current === 0) {
                        this.showError('Cannot divide by zero');
                        return null;
                    }
                    result = 1 / current;
                    break;
                case 'factorial':
                    if (current < 0 || !Number.isInteger(current)) {
                        this.showError('Factorial only defined for non-negative integers');
                        return null;
                    }
                    result = this.factorial(current);
                    break;
                default:
                    return null;
            }
            
            return result;
        } catch (error) {
            this.showError('Calculation Error');
            return null;
        }
    }

    formatResult(result) {
        if (result.toString().length > 12) {
            return parseFloat(result).toExponential(6);
        }
        return result.toString();
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    toggleSign() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.startsWith('-') 
            ? this.currentOperand.slice(1) 
            : '-' + this.currentOperand;
    }

    showError(message) {
        this.currentOperand = 'Error';
        this.previousOperand = message;
        this.shouldResetDisplay = true;
        
        // Add error styling
        const display = document.querySelector('.display');
        display.classList.add('error');
        setTimeout(() => {
            display.classList.remove('error');
        }, 2000);
    }

    updateDisplay() {
        const currentElement = document.getElementById('current-operand');
        const previousElement = document.getElementById('previous-operand');
        
        currentElement.textContent = this.currentOperand;
        
        if (this.operation === 'function') {
            previousElement.textContent = this.previousOperand;
        } else if (this.operation != null) {
            previousElement.textContent = this.previousOperand;
        } else {
            previousElement.textContent = this.previousOperand;
        }
    }
}

// Initialize calculator
const calculator = new ScientificCalculator();

// Button functions
function appendNumber(number) {
    calculator.appendNumber(number);
    calculator.updateDisplay();
}

function appendOperator(operator) {
    calculator.chooseOperation(operator);
    calculator.updateDisplay();
}

function calculate() {
    calculator.compute();
    calculator.updateDisplay();
}

function clearAll() {
    calculator.clear();
    calculator.updateDisplay();
}

function clearEntry() {
    calculator.currentOperand = '0';
    calculator.updateDisplay();
}

function backspace() {
    calculator.delete();
    calculator.updateDisplay();
}

function calculateFunction(func) {
    calculator.computeScientificFunction(func);
    calculator.updateDisplay();
}

function toggleSign() {
    calculator.toggleSign();
    calculator.updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    
    // Decimal point
    if (key === '.') {
        appendNumber('.');
    }
    
    // Operators
    if (key === '+') {
        appendOperator('+');
    }
    if (key === '-') {
        appendOperator('-');
    }
    if (key === '*') {
        appendOperator('*');
    }
    if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendOperator('/');
    }
    if (key === '%') {
        appendOperator('%');
    }
    
    // Equals
    if (key === 'Enter' || key === '=') {
        calculate();
    }
    
    // Clear
    if (key === 'Escape') {
        clearAll();
    }
    
    // Backspace
    if (key === 'Backspace') {
        backspace();
    }
    
    // Parentheses
    if (key === '(') {
        appendOperator('(');
    }
    if (key === ')') {
        appendOperator(')');
    }
});

// Add visual feedback for button presses
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// Add some utility functions for enhanced functionality
function formatNumber(num) {
    if (num.toString().length > 12) {
        return parseFloat(num).toExponential(6);
    }
    return num.toString();
}

// Memory functions (optional enhancement)
let memory = 0;

function memoryStore() {
    memory = parseFloat(calculator.currentOperand) || 0;
}

function memoryRecall() {
    calculator.currentOperand = memory.toString();
    calculator.updateDisplay();
}

function memoryClear() {
    memory = 0;
}

function memoryAdd() {
    memory += parseFloat(calculator.currentOperand) || 0;
}

function memorySubtract() {
    memory -= parseFloat(calculator.currentOperand) || 0;
}

// Initialize display
calculator.updateDisplay();