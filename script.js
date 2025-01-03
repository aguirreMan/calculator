const numberButtons = document.querySelectorAll('.number-button')
const operationButtons = document.querySelectorAll('.operation-button')
const allClearButton = document.querySelector('.all-clear')
const deleteButton = document.querySelector('#delete')
const equalsButton = document.querySelector('.equals-button')
const previousOperand = document.querySelector('.previous-operand')
const currentOperand = document.querySelector('.current-operand')

let chooseOperation = ''
let numberIsEntered = false
let rawNumber = ''
let rawPreviousNumber = ''

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        numberIsEntered = true;
        updateCurrentOperand(button.textContent);
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (numberIsEntered) {
            if (chooseOperation) {
                calculateResult();
            }
            chooseOperation = button.textContent;
            updatePreviousOperand();
        }
    })
})

function updateCurrentOperand(number) {
    if (number === '.' && rawNumber.includes('.')) return
    rawNumber += number
    formatNumbers()
}

function formatNumbers() {
    if (!rawNumber || isNaN(parseFloat(rawNumber))){
        return
    }

    const formattedNumber = parseFloat(rawNumber).toLocaleString('en-US', {
        maximumFractionDigits: 2,
    })

    currentOperand.textContent = formattedNumber
}

function updatePreviousOperand() {
    if (rawNumber !== '') {
        rawPreviousNumber = rawNumber
        previousOperand.textContent = `${currentOperand.textContent} ${chooseOperation}`
        clearCurrentOperand()
    }
}

function clearCurrentOperand() {
    rawNumber = ''
    currentOperand.textContent = ''
}

function calculateResult() {
    const currentNumber = parseFloat(rawNumber)
    const previousNumber = parseFloat(rawPreviousNumber)
    if (!isNaN(currentNumber) && !isNaN(previousNumber) && chooseOperation){
        let result
        switch (chooseOperation){
            case '+':
                result = previousNumber + currentNumber
                break
            case '-':
                result = previousNumber - currentNumber
                break
            case '*':
                result = previousNumber * currentNumber
                break
            case '÷':
                result = previousNumber / currentNumber
                break
            default:
                return
        }

        rawNumber = result.toString()
        formatNumbers()
        previousOperand.textContent = ''
        rawPreviousNumber = ''
        chooseOperation = ''
    }
}

function clearCalculator(){
    rawNumber = ''
    rawPreviousNumber = ''
    currentOperand.textContent = ''
    previousOperand.textContent = ''
    chooseOperation = ''
    numberIsEntered = false
}

function deleteNumber(){
    rawNumber = rawNumber.slice(0, -1)
    formatNumbers()
}

allClearButton.addEventListener('click', clearCalculator)
equalsButton.addEventListener('click', calculateResult)
deleteButton.addEventListener('click', deleteNumber)
