class Calculator {
  constructor(operators, displayValue, operatorElements, keyPressedNumbersAllowed, keyPressedOperatorsAllowed) {
      this.operators = operators;
      this.displayValue = displayValue;
      this.operatorElements = operatorElements;
      this.keyPressedNumbersAllowed = keyPressedNumbersAllowed;
      this.keyPressedOperatorsAllowed = keyPressedOperatorsAllowed;
      this.waitingForOperator = false;
      this.value = null;
      this.operator = null;
  };
  // on key up
  onKeyUp(event) {
      let keyName = event.key;
      
          // Numbers 0-9
          if(keyPressedNumbersAllowed.includes(keyName)) {
              this.setNum(keyName);
          }
      
          // Operators /, *, -, +, =
          if(keyPressedOperatorsAllowed.includes(keyName)) {
              keyName == 'Enter' ? keyName = '=' : keyName = keyName;
              this.calculateWithOperator(keyName);
          }
      
          // Backspace to reset value and display value
          if(keyName == 'Backspace') {
              this.resetDisplayValue();
          }
      
          // Dot 
          if(keyName == ',' || keyName == '.') {
              this.setDot();
          }
  };
  // set sum to display
  setNum(clickedValue) {
      if(this.waitingForOperator) {
          this.displayValue = clickedValue;
              
          this.waitingForOperator = false;
          
          this.resetActiveOperatorStatus();
          
      } else {
  
          this.displayValue === '0' ? this.displayValue = clickedValue : this.displayValue = this.displayValue + clickedValue;
          
       }
              
      this.setDisplayNumber(this.displayValue);
  };
  // set dot to display
  setDot() {
      const clickedValue = '.';

      if(!this.displayValue.includes(clickedValue)) {

          this.displayValue = String(this.displayValue) + clickedValue;
          
          this.setDisplayNumber(this.displayValue);

      }      

  };
  // reset value and display value
  resetDisplayValue() {

      this.displayValue = '0';
      this.value = null;

      this.resetActiveOperatorStatus();
      
      this.setDisplayNumber(this.displayValue);

  };
  // calculate percent of display value
  setPercent() {

      if(this.displayValue != '0') {

          this.displayValue = parseFloat(this.displayValue) / 100;
      
          this.setDisplayNumber(this.displayValue);

      }

  };
  // toggle plus/minus sign
  togglePlusMinus() {

      if(this.displayValue != '0') {

          this.displayValue = String(this.displayValue).charAt(0) === '-' ? String(this.displayValue).substr(1) : '-' + String(this.displayValue);
      
          this.setDisplayNumber(this.displayValue);

      }

  };
  // operate for +,-,*,/
  calculateWithOperator(typedOperator) {

      let pressedElement;
      for(let i=0; i < this.operatorElements.length; i++) {
          if(operatorElements[i].dataset.operator === typedOperator ) {
              pressedElement = operatorElements[i];
          }
      }

      const nextValue = parseFloat(this.displayValue);

      if(!this.value) {

          this.value = nextValue || 0;

      } else if(this.operator) {

          const currentValue = this.value;
          const computedValue = this.operators[this.operator](currentValue, nextValue);

          this.value = computedValue;
          this.displayValue = String(computedValue);
          this.setDisplayNumber(this.displayValue);

      }

      this.waitingForOperator = true;
      this.operator = typedOperator;

      
      if(this.operator != '=') {

          pressedElement.classList.add('active');

      } else {

          this.resetActiveOperatorStatus();

      }
      

  };
  // delete active class from operator
  resetActiveOperatorStatus() {

      for (var i = 0; i < this.operatorElements.length; i++) {

          this.operatorElements[i].classList.remove('active');

      }

  };
  // set display number
  setDisplayNumber(newDisplayValue) {

      document.getElementById('displayValue').value = String(newDisplayValue);

  }
}

// possible operators
const operators = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '=': (prevValue, nextValue) => nextValue
};
// where the value should be displayed
const displayValue = document.getElementById('displayValue').value;
// get all elements with class operator
const operatorElements = document.getElementsByClassName('operator');
// Allowed keypress numbers
const keyPressedNumbersAllowed = ['0','1','2','3','4','5','6','7','8','9'];
const keyPressedOperatorsAllowed = ['/', '*', '-', '+', 'Enter'];

const calculator = new Calculator(operators, displayValue, operatorElements, keyPressedNumbersAllowed, keyPressedOperatorsAllowed);

// Keyup Event listeners
document.addEventListener('keyup', (event) => {
  calculator.onKeyUp(event);
});
