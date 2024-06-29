document.addEventListener('DOMContentLoaded', () => {
  const base = document.querySelector('.base')
  const display = base.querySelector('.screen')
  const keys = base.querySelectorAll('.buttons__key')

  let currentInput = ''
  let currentOperator = null
  let previousOperand = null
  let openParenCount = 0

  function clearInp() {
    currentInput = ''
    currentOperator = null
    previousOperand = null
    display.textContent = '0'
  }

  function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return
    currentInput += number
    display.textContent = currentInput
  }

  function chooseOperation(operator) {
    if (currentInput === '') return
    if (previousOperand !== null) {
      calculate()
    }
    currentOperator = operator
    previousOperand = currentInput
    currentInput = ''
  }

  function calculate() {
    let result
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentInput)
    if (isNaN(prev) || isNaN(current)) return

    switch (currentOperator) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '/':
        result = prev / current
        break
      default:
        return
    }

    currentInput = result.toString()
    currentOperator = null
    previousOperand = null
    display.textContent = currentInput
  }

  function handlePercent() {
    if (currentInput !== '') {
      currentInput = (parseFloat(currentInput) / 100).toString()
      display.textContent = currentInput
    }
  }

  keys.forEach((key) => {
    key.addEventListener('click', (event) => {
      const { action, operator, integer } = event.target.dataset

      if (integer) {
        appendNumber(integer)
      } else if (operator) {
        chooseOperation(operator)
      } else if (action === 'decimal') {
        appendNumber('.')
      } else if (action === 'equals') {
        calculate()
      } else if (action === 'percent') {
        handlePercent()
      } else if (action === 'clear') {
        clearInp()
      } else if (action === 'leftPar') {
        currentInput += '('
        openParenCount++
        display.textContent = currentInput
      } else if (action === 'rightPar') {
        if (openParenCount > 0 && !currentInput.endsWith('(')) {
          currentInput += ')'
          openParenCount--
          display.textContent = currentInput
        }
      }
    })
  })
})
