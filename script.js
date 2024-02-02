const numberButtons = document.querySelectorAll('.number-button')
const operationButtons = document.querySelectorAll('.operation-button')
const allClearButton = document.querySelector('.all-clear')
const deleteButton = document.querySelector('#delete')
const equalsButton = document.querySelector('.equals-button')
const previousOperand = document.querySelector('.previous-operand')
const currentOperand = document.querySelector('.current-operand')
let chooseOperation = ''
let numberIsEntered = false

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        numberIsEntered = true
        updateCurrentOperand(button.textContent)
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(numberIsEntered){
            if(chooseOperation){
                calculateResult()
            }
            chooseOperation = button.textContent
            updatePreviousOperand()
        }
    })
})

function updateCurrentOperand(number){
    if(number === '.' && currentOperand.textContent.includes('.')) return
    currentOperand.textContent += number
}

function updatePreviousOperand(){
    if(currentOperand.textContent !== ''){
    previousOperand.textContent = currentOperand.textContent + ' ' + chooseOperation
    currentOperand.textContent = ''
    }
}

function calculateResult(){
    const currentNumber = parseFloat(currentOperand.textContent)
    const previousNumber = parseFloat(previousOperand.textContent.split(' ')[0])
    if(!isNaN(currentNumber) && !isNaN(previousNumber) && chooseOperation){
        switch(chooseOperation){
            case '+':
                currentOperand.textContent = previousNumber + currentNumber
                break
            case '-': 
                currentOperand.textContent = previousNumber - currentNumber
                break
            case '*': 
                currentOperand.textContent = previousNumber * currentNumber
                break
            case '÷':
                currentOperand.textContent = previousNumber / currentNumber
                break
        }
        previousOperand.textContent = ''
        chooseOperation = ''
    }
}

function clearCalculator(){
    currentOperand.textContent = ''
    previousOperand.textContent = ''
    chooseOperation = ''
    numberIsEntered = false
}

function deleteNumber(){
    currentOperand.textContent = currentOperand.textContent.slice(0, -1)
}

allClearButton.addEventListener('click', clearCalculator)
equalsButton.addEventListener('click', calculateResult)
deleteButton.addEventListener('click', deleteNumber)