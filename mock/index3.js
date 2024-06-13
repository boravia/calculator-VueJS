document.addEventListener('DOMContentLoaded', () => {
  const base = document.querySelector('.base')
  const display = base.querySelector('.screen')
  const keys = base.querySelectorAll('.buttons__key')
  let currentInput = ''
  let currentOperator = ''
  let result
  let equation

  function clearInp() {
    currentInput = ''
    currentOperator = ''
    display.textContent = '0'
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
        key.classList.add('isPressed')
        currentOperator = operator
        currentInput += currentOperator
        display.textContent = currentInput
      }

      if (!display.textContent.includes('.'))
        if (action === 'decimal') {
          currentInput += '.'
          display.textContent = currentInput
        }

      if (action === 'equals') {
        try {
          result = eval(currentInput)
          equation =
            currentInput.split('+') ||
            currentInput.split('-') ||
            currentInput.split('/') ||
            currentInput.split('*')
          let firstOperand = equation[0]
          let secondOperand = equation[1]
          console.log(equation)
          console.log(firstOperand)
          console.log(secondOperand)
          currentInput = ''
          display.textContent = result

          firstOperand = ''
          if (firstOperand === '') {
            currentInput = result + currentOperator + secondOperand
            console.log(currentInput)
            result = eval(currentInput)
            console.log(currentInput)
          }
        } catch (err) {
          clearInp()
          display.textContent = 'Error'
        }
      }

      if (action === 'percent') {
        currentInput = display.textContent / 100
        display.textContent = currentInput
      }

      if (action === 'clear') {
        clearInp()
      }

      if (action === 'leftPar') {
        currentInput += '('
        display.textContent = currentInput
      }

      if (action === 'rightPar') {
        currentInput += ')'
        display.textContent = currentInput
      }
    })
  })
})
