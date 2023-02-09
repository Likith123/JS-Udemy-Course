let currentResult = 0;
let expression = "";
let logEntries = [];
let prevResult;

function writeToLog(operation, prevResult, newNumber, result) {
  let logEntry = {
    operation: operation,
    prevResult: prevResult,
    newNumber: newNumber,
    result: result,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(operatorType) {
  prevResult = currentResult;
  if (!parseInt(userInput.value)) {
    return;
  }
  let input = parseInt(userInput.value);
  let mathOperator;
  if (operatorType === "ADD") {
    currentResult += input;
    mathOperator = "+";
  } else if (operatorType === "SUBTRACT") {
    currentResult -= input;
    mathOperator = "-";
  } else if (operatorType === "MULTIPLY") {
    currentResult *= input;
    mathOperator = "*";
  } else if (operatorType === "DIVIDE") {
    currentResult /= input;
    mathOperator = "/";
  }
  expression = `${prevResult} ${mathOperator} ${input.toString()}`;
  outputResult(currentResult, expression);
  writeToLog(operatorType, prevResult, userInput.value, currentResult);
  userInput.value = "";
}

// Now the below commented functions are not required because we used bind() method below

// function add() {
//   calculateResult("ADD");
// }

// function subtract() {
//   calculateResult("SUBTRACT");
// }

// function multiply() {
//   calculateResult("MULTIPLY");
// }

// function divide() {
//   calculateResult("DIVIDE");
// }

addBtn.addEventListener("click", calculateResult.bind(this, 'ADD'));
subtractBtn.addEventListener("click", calculateResult.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", calculateResult.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", calculateResult.bind(this, "DIVIDE"));
