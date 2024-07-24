<script setup lang="ts">
import { computed, ref } from 'vue'

const currentInput = ref<string>('');
const currentOperator = ref<string | null>(null);
const previousOperand = ref<string | null>(null);

const display = computed(() => {
  return currentInput.value || '0';
});

function clearInput() {
  currentInput.value = '';
  currentOperator.value = null;
  previousOperand.value = null;
  return clearInput
}

function appendNumber(number: string) {
  if (number === '.' && currentInput.value.includes('.')) return;
  currentInput.value += number;
  return appendNumber
}

function chooseOperation(operator: string) {
  if (currentInput.value === '') return;
  if (previousOperand.value !== null) {
    calculate();
  }
  currentOperator.value = operator;
  previousOperand.value = currentInput.value;
  currentInput.value = '';
  return chooseOperation
}

function calculate() {
  let result: number;
  const prev = parseFloat(previousOperand.value || '0');
  const current = parseFloat(currentInput.value);
  if (isNaN(prev) || isNaN(current)) return;

  switch (currentOperator.value) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput.value = result.toString();
  previousOperand.value = null;
  currentOperator.value = null;
  return calculate
}

function handlePercent() {
  if (currentInput.value !== '') {
    currentInput.value = (parseFloat(currentInput.value) / 100).toString();
  }
  return handlePercent
}
</script>

<template>
  <div class="base">
    <div class="screen">{{ display }}</div>
    <div class="buttons">
      <button class="buttons__key buttons__actions clear_btn" @click="clearInput">C</button>
      <button class="buttons__key buttons__actions" @click="appendNumber('.')">.</button>
      <button class="buttons__key buttons__actions" @click="chooseOperation('+')">+</button>
      <button class="buttons__key" @click="appendNumber('7')">7</button>
      <button class="buttons__key" @click="appendNumber('8')">8</button>
      <button class="buttons__key" @click="appendNumber('9')">9</button>
      <button class="buttons__key buttons__actions" @click="chooseOperation('-')">-</button>
      <button class="buttons__key" @click="appendNumber('4')">4</button>
      <button class="buttons__key" @click="appendNumber('5')">5</button>
      <button class="buttons__key" @click="appendNumber('6')">6</button>
      <button class="buttons__key buttons__actions" @click="chooseOperation('*')">&#215;</button>
      <button class="buttons__key" @click="appendNumber('1')">1</button>
      <button class="buttons__key" @click="appendNumber('2')">2</button>
      <button class="buttons__key" @click="appendNumber('3')">3</button>
      <button class="buttons__key buttons__actions" @click="chooseOperation('/')">&#247;</button>
      <button class="buttons__key" @click="appendNumber('0')">0</button>
      <button class="buttons__key buttons__actions" @click="handlePercent">%</button>
      <button class="buttons__key buttons__equal-sign" @click="calculate">=</button>
    </div>
  </div>
</template>

<style scoped></style>
