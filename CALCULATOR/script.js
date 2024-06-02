document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value === null) {
                handleSpecial(button.id);
            } else {
                handleInput(value);
            }
        });
    });

    function handleInput(value) {
        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                if (operator) {
                    previousInput = calculate(previousInput, currentInput, operator);
                    display.innerText = previousInput;
                } else {
                    previousInput = currentInput;
                }
                operator = value;
                currentInput = '';
            }
        } else if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += value;
                display.innerText = currentInput;
            }
        } else {
            currentInput += value;
            display.innerText = currentInput;
        }
    }

    function handleSpecial(id) {
        if (id === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.innerText = '0';
        } else if (id === 'equals') {
            if (operator && currentInput !== '') {
                currentInput = calculate(previousInput, currentInput, operator);
                display.innerText = currentInput;
                operator = null;
                previousInput = '';
            }
        }
    }

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            default: return '';
        }
    }
});
