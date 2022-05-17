

//Declare functions


// Input values based on user mouse clicks
// If display shows 0, override the display with user's input, otherwise, concatenate the user's input.
const inputValues = (e) => {
    if (myDisplay.innerHTML == "0") {
        myDisplay.innerHTML = e.target.value;
    } else {
        myDisplay.innerHTML += e.target.value;
    }
}


// Input values based on user keystroke

const inputKeys = (e) => {
    if (myDisplay.innerHTML == "0") {
        myDisplay.innerHTML = e.key;
    } else {
        myDisplay.innerHTML += e.key;
    }
}

// Check if key pressed is in the list of allowable buttons

const onKeyDown = (e) => {
    let keyName = e.key

    if (keyName == "Enter") {
        evaluateExpression()
    } else if (keyName == "Backspace") {
        clearValues()
    } else if (keyPressedNumbersAllowed.includes(keyName) || keyPressedOperatorsAllowed.includes(keyName)) {
        inputKeys(e)
    } 
}


// Clear display and calculator expression

const clearValues = () => {
    myDisplay.innerHTML = "0";
}

// Display error for expressions that cannot evaluate, wait 2 seconds and clear calculator

const evaluateExpression = () => {
    try {
        myDisplay.innerHTML = eval(myDisplay.innerHTML)
        if (myDisplay.innerHTML == "undefined") {
            const timeoutMessage = setTimeout(clearValues, 2000)
        }
    } 
    catch (err) {
        myDisplay.innerHTML = "Cannot evaluate"
        const timeoutMessage = setTimeout(clearValues, 2000)
    }
}


// Declare variables

const keyPressedNumbersAllowed = ['0','1','2','3','4','5','6','7','8','9'];
const keyPressedOperatorsAllowed = ['/', '*', '-', '+'];

const myDisplay = document.querySelector(".calcDisplay")
const buttons = document.querySelectorAll("button")
const clearButton = document.querySelector(".clearButton")
const evalButton = document.querySelector(".evalButton")


// Add event listeners

buttons.forEach(button => button.addEventListener("click", inputValues))
clearButton.addEventListener("click", clearValues)
evalButton.addEventListener("click", evaluateExpression)
document.addEventListener("keydown", onKeyDown)

