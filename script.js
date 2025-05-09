class Calculator {
    constructor() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.currentOperand;
        if (this.operation != null) {
            document.querySelector('.previous-operand').textContent = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            document.querySelector('.previous-operand').textContent = '';
        }
    }
}

const calculator = new Calculator();

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'AC') {
            calculator.clear();
        } else if (button.textContent === '←') {
            calculator.delete();
        } else if (button.textContent === '=') {
            calculator.compute();
        } else if (['+', '-', '×', '÷'].includes(button.textContent)) {
            calculator.chooseOperation(button.textContent);
        } else {
            calculator.appendNumber(button.textContent);
        }
        calculator.updateDisplay();
    });
});