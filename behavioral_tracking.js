// getting the register_button by id and adding and eventlistener to it
// commented out because this is handled by register.js in this version
// document.getElementById("register_button").addEventListener("click", setToVisible);
let mouseclicks = 0;

// adding a eventlistener that adds one to the mouseclicks variable for every mouseclick
document.addEventListener("click", () => {
    mouseclicks++;
});

// getting all inputs, textareas and select fields from the register.html
let inputFields = document.querySelectorAll("input, textarea, select");
let inputData = {};

// looping through all the inputFields
for(let input of inputFields) {

    // filling the inputdata with default values and index it by the inputname string
    inputData[input.name] = {
        keyPresses: 0,
        charactersTyped: 0,
        lastCharacterLength: 0
    };

    // adding a eventlistener to the keydown event that add one to the keypress value in the array for the corresponding index
    input.addEventListener("keydown", () => {
        inputData[input.name].keyPresses++;
    });

    // adding an eventlistener to the input event
    input.addEventListener("input", (event) => {
        let change = 0;

        // comparing the length of the current input field with the last length, if it is bigger than the previous length.
        // if the change is positive(the length is now longer than the previous length), then change the "change" variable to this difference
        if(event.target.value.length - inputData[input.name].lastCharacterLength > 0) {
            change = event.target.value.length - inputData[input.name].lastCharacterLength;
        }

        // update the previous length of the inputfield by the current length
        inputData[input.name].lastCharacterLength = event.target.value.length;
        // add the change to the charactersTyped variable
        inputData[input.name].charactersTyped += change;
    });
}

// method that gets called when the register button is pressed
function setToVisible() {
    // changing the visibility of the behavioral tracking div to visible
    document.querySelector(".behavioral_tracking").style.visibility = 'visible';
    // printing the number of mouseclicks
    document.getElementById("mouseClicks").innerHTML = 'Number of mouseclicks: ' + mouseclicks + ' clicks';
    // printing the amount of time on the website to the screen, divide by 1000 to go from ms to sec, and convert seconds to possible minutes
    document.getElementById("timeSpentOnPage").innerHTML = 'Time spent on webpage: ' + Math.floor(performance.now()/1000/60) + ' minutes and ' + Math.floor(performance.now()/1000%60) + ' seconds';
    
    // initializing keyPressString and CharactersTypedString
    let keyPressString = "";
    let charactersTypedString = "";
    // looping through the inputData(this contains an array that is indexed by the name of the inputfields)
    for(let input in inputData) {
        // appending the amount and the inputfields name to the corresponding string, appending <br> at the end to break the line
        keyPressString += 'Amount of keypresses in ' + input + ' is ' + inputData[input].keyPresses + '<br>';
        charactersTypedString += 'Amount of characters typed in ' + input + ' is ' + inputData[input].charactersTyped + '<br>';
    }
    // inserting the strings in the correct labels
    document.getElementById('keyPresses').innerHTML = keyPressString;
    document.getElementById("totalCharactersTyped").innerHTML = charactersTypedString;
    window.scrollTo({ top: 0, behavior: "smooth" });
};