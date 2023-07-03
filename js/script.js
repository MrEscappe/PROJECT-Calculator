const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const clearKey = document.querySelector(".clear");
const deleteKey = document.querySelector(".delete");
const equalsKey = document.querySelector(".equals");
const decimalKey = document.querySelector(".decimal");
const currentDisplayText = document.querySelector(".screen__output__text");
const previousDisplayText = document.querySelector(".screen__previous__output");

let currentDisplay = "";
let previousDisplay = "";
let operator = "";
let result = "";

numberKeys.forEach((number) => {
	number.addEventListener("click", () => {
		// limit the number of digits to 9 on each operand ingnoring the operator
		if (currentDisplay.length < 9) {
			currentDisplay += number.textContent;
			currentDisplayText.textContent = currentDisplay;
		}
	});
});

decimalKey.addEventListener("click", () => {
	// check if already a decimal point and dont allow more than one(e.g. 1.1.1), but allow (e.g. 1.1 + 1.1)

	if (currentDisplay.includes(".")) return;

	currentDisplay += decimalKey.textContent;
	currentDisplayText.textContent = currentDisplay;
});

operatorKeys.forEach((operatorKey) => {
	operatorKey.addEventListener("click", () => {
		if (currentDisplay === "") return;
		// check if an operator has already been selected
		if (operator !== "") {
			// if an operator has been selected, calculate the result
			calculate();
		} else {
			operator = operatorKey.textContent;
			currentDisplay += operatorKey.textContent;
			currentDisplayText.textContent = currentDisplay;
		}
	});
});

equalsKey.addEventListener("click", () => {
	if (currentDisplay === "") return;
	calculate();
});

clearKey.addEventListener("click", () => {
	clear();
});

deleteKey.addEventListener("click", () => {
	deleteNumber();
});

equalsKey.addEventListener("click", () => {
	calculate();
});

function clear() {
	currentDisplay = "";
	previousDisplay = "";
	operator = "";
	currentDisplayText.textContent = "0";
	previousDisplayText.textContent = "";
}

function deleteNumber() {
	if (currentDisplay === "" || currentDisplay === "0" || currentDisplay === result) return;

	if (currentDisplay.length === 1) {
		currentDisplay = "";
		currentDisplayText.textContent = "0";
		return;
	}

	currentDisplay = currentDisplay.slice(0, -1);
	currentDisplayText.textContent = currentDisplay;
}

function calculate() {
	// check if an operator has been selected
	if (operator === "") return;

	// check if the last character is an operator
	if (currentDisplay[currentDisplay.length - 1] === operator) return;

	// split the string into an array of numbers
	let numbers = currentDisplay.split(operator);

	// convert the array of strings to an array of numbers
	numbers = numbers.map((number) => parseFloat(number));

	// check if the second number is 0 and the operator is division
	if (numbers[1] === 0 && operator === "÷") {
		currentDisplayText.textContent = "You can't divide by 0 >:(";
		// clear the display after 2 seconds
		setTimeout(() => {
			clear();
		}, 2000);
		return;
	}

	// calculate the result
	switch (operator) {
		case "+":
			result = numbers[0] + numbers[1];
			break;
		case "-":
			result = numbers[0] - numbers[1];
			break;
		case "×":
			result = numbers[0] * numbers[1];
			break;
		case "÷":
			result = numbers[0] / numbers[1];
			break;
		default:
			return;
	}

	// convert the result to a number
	result = Number(result);

	// check if the result is a whole number
	if (Number.isInteger(result)) {
		result = result.toString();
	}

	// check if the result is a decimal number
	if (!Number.isInteger(result)) {
		// Check if the result is a whole number
		if (result % 1 === 0) {
			result = result.toString();
		} else {
			// round the result to 4 decimal places
			result = result.toFixed(2);
		}
	}

	// check if the result is too long
	if (result.length > 9) {
		result = result.slice(0, 9);
	}

	// display the result
	previousDisplay = currentDisplay;
	currentDisplay = result;
	previousDisplayText.textContent = previousDisplay;
	currentDisplayText.textContent = currentDisplay;
	operator = "";
}
