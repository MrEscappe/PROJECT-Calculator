const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const clearKey = document.querySelector(".clear");
const deleteKey = document.querySelector(".delete");
const equalsKey = document.querySelector(".equals");
const currentDisplayText = document.querySelector(".screen__output__text");
const previousDisplayText = document.querySelector(".screen__previous__output");

//Current display is the display that shows the current number being typed
let currentDisplay = "";

//Previous display is the display that shows the previous result
let previousDisplay = "";

//Operator is the operator that is being used
let operator = "";

//Result is the result of the calculation
let result = "";

numberKeys.forEach((number) => {
	number.addEventListener("click", () => {
		// limit the number of digits to 9
		if (currentDisplay.length < 9) {
			currentDisplay += number.textContent;
			currentDisplayText.textContent = currentDisplay;
		}
	});
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
	if (currentDisplay === "" || currentDisplay === "0") return;

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

	console.log(numbers);
	// convert the array of strings to an array of numbers
	numbers = numbers.map((number) => parseFloat(number));

	// check if the second number is 0 and the operator is division
	if (numbers[1] === 0 && operator === "÷") {
		alert("You can't divide by 0");
		clear();
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

	// check if the result is a whole number
	if (Number.isInteger(result)) {
		result = result.toString();
	}

	// check if the result is a decimal number
	if (!Number.isInteger(result)) {
		result = result.toFixed(2);
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

function toFixed() {
	if (!Number.isInteger(result)) {
		result = result.toFixed(2);
	}
}
