# Creating a web calculator

## This is my application of the skills (HTML, CSS and Javascript) I have learned so far in the bootcamp.

I decided to try creating a simple web calculator and determined the following tasks/sub-tasks before starting to code. 

Task 1 -    Each button element is mapped to a value
Task 2 -    When a button is pressed, store value into a variable
Task 2a -   Meanwhile, display value in calcDisplay
Task 3 -    When "=" button is pressed, evaluate the expression
Task 3a -   Display value in calc display
Task 4 -    When "Clear" button is pressed, clear the expression and clear display

## After completing the calculator, I have the following reflections.
Task 1 -    Used button value attribute
Task 2 -    I initially thought I needed a separate JS variable to compute the user's inputs. I realized this was redundant as I can simply use the HTML element to evaluate the expression.
Task 2a -   Used DOM to target html element
Task 3 -    Used a built-in eval function; realized I needed to handle errors in case user inputs an invalid expression (e.g. 25+/*5)
Task 3a -   Used DOM to target the html element and assign the result of the evaluation to the element
Task 4 -    Used DOM, assign the value as zero

## The mechanics of the calculator became very simplified as soon as I realized I could use the DOM HTML element as my "variable" and basically evaluate the expression on the spot without having to do a "back-end" calculation with JS variables.
