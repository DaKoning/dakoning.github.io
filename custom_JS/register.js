let form = document.forms["registerform"];

let username = form["uname"];
let password = form["psw"];
let fname = form["fname"];
let lname = form["lname"];
let street = form["street"];
let number = form["number"];
let zipcode = form["zipcode"];
let country = form["country"];
let email = form["email"];
let sex = form["sex"];
let language = form["language"];

let unameError = document.getElementById("unameError");
let passwordError = document.getElementById("passwordError");
let fnameError = document.getElementById("fnameError");
let lnameError = document.getElementById("lnameError");
let streetError = document.getElementById("streetError");
let numberError = document.getElementById("numberError");
let zipcodeError = document.getElementById("zipcodeError");
let countryError = document.getElementById("countryError");
let emailError = document.getElementById("emailError");
let sexError = document.getElementById("sexError");
let languageError = document.getElementById("languageError");

// Check for all important fields whether they are correct
// upon page load (and there's already something filled in)
// or on keypress in that field

if (username.value.length != 0) checkUsername();
username.onkeyup = function() { checkUsername(); }

if (password.value.length != 0) checkPassword(); 
password.onkeyup = function() { checkPassword(); }

if (fname.value.length != 0) checkFname(); 
fname.onkeyup = function() { checkFname(); }

if (lname.value.length != 0) checkLname();
lname.onkeyup = function() { checkLname(); }

if (street.value.length != 0) checkStreet();
street.onkeyup = function() { checkStreet(); }

if (number.value.length != 0) checkNumber();
number.onkeyup = function() { checkNumber(); }

if (zipcode.value.length != 0) checkZipcode();
zipcode.onkeyup = function() { checkZipcode(); }

if (country.value != "none")   checkCountry();
country.oninput = function() { checkCountry(); }

if (email.value.length != 0) checkEmail();
email.onkeyup = function() { checkEmail(); }

if (sex.value != "none")   checkSex();
sex.oninput = function() { checkSex(); }

if (language.value != "none")   checkLanguage();
language.oninput = function() { checkLanguage(); }

// Check all the important fields of to form
// and go back to field if input is wrong
function checkForm() {
    if (!checkUsername()) scrollToField(username);
    else if (!checkPassword()) scrollToField(password);
    else if (!checkFname()) scrollToField(fname);
    else if (!checkLname()) scrollToField(lname);
    else if (!checkStreet()) scrollToField(street);
    else if (!checkNumber()) scrollToField(number);
    else if (!checkZipcode()) scrollToField(zipcode);
    else if (!checkCountry()) scrollToField(country);
    else if (!checkEmail()) scrollToField(email);
    else if (!checkSex()) scrollToField(sex);
    else if (!checkLanguage()) scrollToField(language);
    else {
        alert(
            "Username: " + username.value +
            "\nPassword: " + password.value +
            "\nName: " + fname.value + " " + lname.value +
            "\nAddress 1: " + document.getElementById("street").value + " " + document.getElementById("number").value +
            "\nAddress 2: " + zipcode.value + ", " + document.getElementById("country").value +
            "\nEmail: " + email.value +
            "\nSex: " + sex.value +
            "\nLanguage: " + language.value +
            "\nAbout / Bio: " + document.getElementById("bio").value
        );
        setToVisible(); // show behavioral tracking
        return false;
    }
    return false;
}

// Scroll to the field with an offset,
// put cursor at end of field, and
// animate the field
function scrollToField(field) {
    let fieldOffset = field.getBoundingClientRect().top;
    let extraOffset = 100;
    let offset = fieldOffset + window.pageYOffset - extraOffset;
    window.scrollTo({ top: offset, behavior: "smooth" });
    if (field && field.value) {
        field.selectionStart = field.selectionEnd = field.value.length;
    }
    field.focus({preventScroll: true});
    emphasizeField(field);
}

// Emphasize the field by animating it
function emphasizeField(field) {
    field.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1)" }],
        { delay: 300, duration: 200, iterations: 2 });
}

// Change css because of error
function hasError(field, error) {
    field.style.borderColor = "red";
    error.style.color = "red";
    error.style.display = "inline-block";
}

// Change css because field is good
function noError(field, error) {
    field.style.borderColor = "green";
    error.style.color = "green";
    error.style.display = "inline-block";
    error.innerHTML = "Looks good!";
}

// Functions to check string for certain characters, as we can't use regex

function containsLowercase(string) {
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) >= 'a' && string.charAt(i) <= 'z') return true;
    }
    return false;
}

function containsUppercase(string) {
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) >= 'A' && string.charAt(i) <= 'Z') return true;
    }
    return false;
}

function containsNumber(string) {
    for (let i = 0; i < 10; i++) {
        if (string.includes(i)) return true;
    }
    return false;
}

function containsSpecialChar(string) {
    let special = "~`!@#$%^&*()_-+={[}]|\\:;\"\'<,>.?/";
    for (let i = 0; i < special.length; i++) {
        if (string.includes(special.charAt(i))) return true;
    }
    return false;
}

function onlyAlphabet(string) {
    let ch;
    for (let i = 0; i < string.length; i++) {
        ch = string.charAt(i);
        if (!(
            (ch >= 'a' && ch <= 'z') ||
            (ch >= 'A' && ch <= 'Z') ||
            (ch == " ")
        )) return false;
    }
    return true;
}

function onlyNumbers(string) {
    let ch;
    for (let i = 0; i < string.length; i ++) {
        ch = string.charAt(i);
        if (!(ch >= "0" && ch <= "9")) return false;
    }
    return true;
}

function goodEmail(string) {
    // /[A-Za-z0-9._+-]+@[A-Za-z-]+\.[A-Za-z0-9.-]{2,}/

    let arr = string.split('@');
    if (arr.length-1 != 1) return false; // if there are no @'s
    if (arr[0].length < 1) return false;

    let ch;
    for (let i = 0; i < arr[0].length; i++) {
        ch = arr[0].charAt(i);
        if (!(
            (ch >= 'a' && ch <= 'z') ||
            (ch >= 'A' && ch <= 'Z') ||
            (ch >= "0" && ch <= "9") ||
            ch == "." || ch == "_" || ch == "+" || ch == "-"
        )) return false;
    }

    let arr2 = arr[1].split(".");
    if (arr2.length-1 < 1) return false; // if there are no .'s
    for (let i = 0; i < arr2[0].length; i++) {
        ch = arr2[0].charAt(i);
        if (!(
            (ch >= 'a' && ch <= 'z') ||
            (ch >= 'A' && ch <= 'Z') ||
            ch == "-"
        )) return false;
    }

    

    for (let i = 0; i < arr2[1].length; i++) {
        ch = arr2[1].charAt(i);
        if (!(
            (ch >= 'a' && ch <= 'z') ||
            (ch >= 'A' && ch <= 'Z') ||
            (ch >= "0" && ch <= "9") ||
            ch == "." || ch == "-"
        )) return false;
    }
    if (arr2[1].length < 2) return false;

    return true;
}


function checkUsername() {
    if (username.value.length < 5 || username.value.length > 12) {
        hasError(username, unameError);
        unameError.innerHTML = "Username must be between 5 and 12 characters long.";
        return false;
    }
    else if (!containsUppercase(username.value.charAt(0))) {
        hasError(username, unameError);
        unameError.innerHTML = "Username must start with an uppercase letter.";
        return false;
    }
    else if (!(containsNumber(username.value.charAt(username.value.length-1)) 
                || containsSpecialChar(username.value.charAt(username.value.length-1)))) {
        hasError(username, unameError);
        unameError.innerHTML = "Username must end with a digit or a special character.";
        return false;
    }
    else {
        noError(username, unameError);
        return true;
    }
}

function checkPassword() {
    if (password.value.length < 12) {
        hasError(password, passwordError);
        passwordError.innerHTML = "Password must be at least 12 characters long, but 14 or more is better.";
        return false;
    }
    else if (!(containsLowercase(password.value) && containsUppercase(password.value)
                && containsNumber(password.value) && containsSpecialChar(password.value))) {
        hasError(password, passwordError);
        passwordError.innerHTML = "Password must contain all of the following: uppercase letters, lowercase letters, numbers, symbols.";
        return false;
    }
    else if (password.value.length < 14) {
        password.style.borderColor = "darkorange"
        passwordError.style.display = "inline-block";
        passwordError.style.color = "darkorange";
        passwordError.innerHTML = "Password length is okay, 14 or more characters would be more secure.";
        return true;
    }
    else {
        noError(password, passwordError);
        return true;
    }
}

function checkName(name) {
    if (!onlyAlphabet(name)) return false;
    return true;
}

function checkFname() {
    if (!checkName(fname.value)) {
        hasError(fname, fnameError);
        fnameError.innerHTML = "First name can only contain letters from the alphabet.";
        return false;
    }
    else if (fname.value.length < 1) {
        hasError(fname, fnameError);
        fnameError.innerHTML = "Last name must be at least 1 character long.";
        return false;
    }
    else {
        noError(fname, fnameError);
        return true;
    }
}

function checkLname() {
    if (!checkName(lname.value)) {
        hasError(lname, lnameError);
        lnameError.innerHTML = "Last name can only contain letters from the alphabet.";
        return false;
    }
    else if (lname.value.length < 1) {
        hasError(lname, lnameError);
        lnameError.innerHTML = "Last name must be at least 1 character long.";
        return false;
    }
    else {
        noError(lname, lnameError);
        return true;
    }
}

function checkStreet() {
    if (!onlyAlphabet(street.value)) {
        hasError(street, streetError);
        streetError.innerHTML = "Street can only contain letters from the alphabet.";
        return false;
    }
    else {
        noError(street, streetError);
        return true;
    }
}

function checkNumber() {
    if (!onlyNumbers(number.value)) {
        hasError(number, numberError);
        numberError.innerHTML = "House number must be a number.";
        return false;
    }
    else {
        noError(number, numberError);
        return true;
    }
}

function checkZipcode() {
    if (!(
        onlyNumbers(zipcode.value.substring(0, 4)) &&
        onlyAlphabet(zipcode.value.substring(4, 6)) &&
        zipcode.value.length == 6
    )) {
        hasError(zipcode, zipcodeError);
        zipcodeError.innerHTML = "Zipcode must be of form 1234AB.";
        return false;
    }
    else {
        noError(zipcode, zipcodeError);
        return true;
    }
}

function checkCountry() {
    if (country.value == "none") {
        hasError(country, countryError);
        countryError.innerHTML = "Country is required.";
        return false;
    }
    else {
        noError(country, countryError);
        return true;
    }
}

function checkEmail() {
    if (!goodEmail(email.value)) {
        hasError(email, emailError);
        emailError.innerHTML = "Email not valid.";
        return false;
    }
    else {
        noError(email, emailError);
        return true;
    }
}

function checkSex() {
    if (sex.value == "none") {
        hasError(sex, sexError);
        sexError.innerHTML = "Sex is required.";
        return false;
    }
    else {
        noError(sex, sexError);
        return true;
    }
}

function checkLanguage() {
    if (language.value == "none") {
        hasError(language, languageError);
        languageError.innerHTML = "Language is required.";
        return false;
    }
    else {
        noError(language, languageError);
        return true;
    }
}