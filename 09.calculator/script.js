class Calculator {
  constructor(currentOperand, previousOperand) {
    this.currentOperand = currentOperand;
    this.previousOperand = previousOperand;
  }
  allClear() {
    this.currentOperand.textContent = "";
    this.previousOperand.textContent = "";
    this.operation = undefined;
  }
  handleOperation(operation) {
    if (
      !this.previousOperand.textContent.length &&
      !this.currentOperand.textContent.length
    ) {
      return;
    } else if (this.operation === undefined) {
      this.operation = operation;
      this.previousOperand.textContent = `${this.currentOperand.textContent} ${operation}`;
      this.currentOperand.textContent = "";
    } else if (
      this.previousOperand.textContent.length &&
      this.currentOperand.textContent.length
    ) {
      this.compute();
      this.operation = operation;
      this.previousOperand.textContent = `${this.previousOperand.textContent} ${operation}`;
    } else {
      this.operation = operation;
      this.previousOperand.textContent = `${this.previousOperand.textContent} ${operation}`;
    }
  }
  compute() {
    if (!this.operation) return;
    let result;
    let prev = parseFloat(this.previousOperand.textContent);
    let current = parseFloat(this.currentOperand.textContent);
    switch (this.operation) {
      case "-":
        result = prev - current;
        break;
      case "+":
        result = prev + current;
        break;
      case "*":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        break;
    }
    this.previousOperand.textContent = result;
    this.currentOperand.textContent = "";
  }
  updateDisplay(text) {
    if (this.previousOperand.textContent.length) {
      const str = this.previousOperand.textContent;
      if (
        !str.includes("+") &&
        !str.includes("-") &&
        !str.includes("*") &&
        !str.includes("÷")
      ) {
        return;
      }
    }
    if (this.currentOperand.textContent.length <= 0 && text[0] === ".") {
      text = "0" + text;
    }
    if (text.includes(".") && this.currentOperand.textContent.includes(".")) {
      return;
    }
    text = this.currentOperand.textContent + text;
    console.log(typeof text);
    this.currentOperand.textContent = text.toLocaleString("en");
  }
  del() {
    if (this.currentOperand.textContent.length <= 0) return;
    const text = this.currentOperand.textContent.slice(0, -1);
    this.currentOperand.textContent = text;
  }
}

const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");
const allClear = document.getElementById("all-clear");
const numberButtons = document.querySelectorAll(".number");
const del = document.getElementById("del");
const operations = document.querySelectorAll("#operation");
const compute = document.getElementById("compute");

const user = new Calculator(currentOperand, previousOperand);

allClear.addEventListener("click", () => {
  user.allClear();
});
del.addEventListener("click", () => {
  user.del();
});
numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    user.updateDisplay(e.target.textContent);
  });
});
operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    user.handleOperation(e.target.textContent);
  });
});
compute.addEventListener("click", () => {
  user.compute();
});
