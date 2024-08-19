class Calculator {
  constructor(previousOperandTextElement,currentOperandTextElement){
    // what is the function of these two lines
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }

  dot() {
    if(!this.currentOperand.toString().includes('.')) {
      this.currentOperand = this.currentOperand.toString() + '.'
    }
  }

  delete() {
    let str = this.currentOperand.toString()
    this.currentOperand = str.slice(0,str.length - 1)
  }

  appendNumber(button_number) {
    this.currentOperand = this.currentOperand.toString() + button_number.toString()
  }

  chooseOperation(operator_input) {
    
    if (this.operation == undefined){
      this.operation = operator_input

      this.previousOperand = this.currentOperand.toString() + this.operation
      this.currentOperand = ''
    }

    else{
      this.operation = operator_input
      this.previousOperand = this.previousOperand.toString().slice(0,this.previousOperand.length - 1) + this.operation
    }
  }

  

  compute() {
    let result
    let a = parseFloat(this.previousOperand)
    let b = parseFloat(this.currentOperand)

    if (isNaN(a) || isNaN(b)) return;

    switch (this.operation) {
      case "+":
        result = a + b
        break

      case "-":
        result = a - b
        break

      case "*":
        result = a * b
        break

      case "÷":
        result = a / b
        break

      default:
        return;
    }

    this.previousOperand = ''
    this.currentOperand = result.toString()
    this.previousOperand = '';
    this.operation = undefined;
  }


  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
  }

}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-all-clear]')
const dotButton = document.querySelector('[data-dot]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

// for all buttons, when clicked display
// button.innerText returns the text in the button
numberButtons.forEach(button => {
  button.addEventListener('click',() => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click',() => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
});

allclearButton.addEventListener('click',() => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click',() => {
  calculator.delete()
  calculator.updateDisplay()
})

equalsButton.addEventListener('click',() => {
  calculator.compute()
  calculator.updateDisplay()
})

dotButton.addEventListener('click',() => {
  calculator.dot()
  calculator.updateDisplay()
})

