document.addEventListener('DOMContentLoaded', () => {
  const base = document.querySelector('.base')
  const display = base.querySelector('.screen')
  const keys = base.querySelectorAll('.buttons__key')
  let currentInput = ''
  let previousInput = ''
  let currentOperator = ''
  let lastOperator = ''
  let lastOperand = ''

  function calculate() {
    let result
    let firstValue = parseFloat(previousInput)
    let secondValue = parseFloat(currentInput)

    switch (currentOperator) {
      case 'plus':
        result = firstValue + secondValue
        break
      case 'minus':
        result = firstValue - secondValue
        break
      case 'multiply':
        result = firstValue * secondValue
        break
      case 'divide':
        result = firstValue / secondValue
        break
      default:
        result = secondValue
    }
    return result
  }

  keys.forEach((key) => {
    key.addEventListener('click', (event) => {
      const { action, operator, integer } = event.target.dataset
      keys.forEach((k) => k.classList.remove('isPressed'))

      if (integer) {
        currentInput += integer
        display.textContent = currentInput
      }

      if (operator) {
        if (currentInput !== '') {
          previousInput = currentInput
          currentInput = ''
        }
        key.classList.add('isPressed')
        currentOperator = operator
      }

      if (!display.textContent.includes('.'))
        if (action === 'decimal') {
          currentInput += '.'
          display.textContent = currentInput
        }

      if (action === 'equals') {
        if (currentInput !== '' && previousInput !== '' && currentOperator !== '') {
          display.textContent = calculate()
          lastOperand = currentInput
          lastOperator = currentOperator
          previousInput = display.textContent
          currentInput = ''
          currentOperator = ''
        } else if (lastOperand !== '' && lastOperator !== '') {
          currentInput = lastOperand
          currentOperator = lastOperator
          display.textContent = calculate()
          previousInput = display.textContent
          currentInput = ''
          currentOperator = ''
        }
      }

      if (action === 'percent') {
        currentInput = display.textContent / 100
        display.textContent = currentInput
      }

      if (action === 'clear') {
        currentInput = ''
        previousInput = ''
        currentOperator = ''
        display.textContent = '0'
      }
    })
  })
})
