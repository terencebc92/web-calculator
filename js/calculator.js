/* 
##
This is my application of the skills (HTML, CSS and Javascript) I have learned so far in the bootcamp.

I decided to try creating a simple web calculator and determined the following tasks/sub-tasks before starting to code. 

Task 1 -    Each button element is mapped to a value
Task 2 -    When a button is pressed, store value into a variable
Task 2a -   Meanwhile, display value in calcDisplay
Task 3 -    When "=" button is pressed, evaluate the expression
Task 3a -   Display value in calc display
Task 4 -    When "Clear" button is pressed, clear the expression and clear display

After completing the calculator, I have the following reflections.
Task 1 -    Used button value attribute
Task 2 -    I initially thought I needed a separate JS variable to compute the user's inputs. I realized this was redundant as I can simply use the HTML element to evaluate the expression.
Task 2a -   Used DOM to target html element
Task 3 -    Used a built-in eval function; realized I needed to handle errors in case user inputs an invalid expression (e.g. 25+/*5)
Task 3a -   Used DOM to target the html element and assign the result of the evaluation to the element
Task 4 -    Used DOM, assign the value as zero

The mechanics of the calculator became very simplified as soon as I realized I could use the DOM HTML element as my "variable" and basically evaluate the expression on the spot without having to do a "back-end" calculation with JS variables.

##
*/

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

