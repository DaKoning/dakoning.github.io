let form = document.forms["registerform"];

let username = form["uname"];
let password = form["psw"];
let fname = form["fname"];
let lname = form["lname"];
let zipcode = form["zipcode"];
let email = form["email"];

let unameError = document.getElementById("unameError");
let passwordError = document.getElementById("passwordError");
let fnameError = document.getElementById("fnameError");
let lnameError = document.getElementById("lnameError");
let zipcodeError = document.getElementById("zipcodeError");
let emailError = document.getElementById("emailError");

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

if (zipcode.value.length != 0) checkZipcode();
zipcode.onkeyup = function() { checkZipcode(); }

if (email.value.length != 0) checkEmail();
email.onkeyup = function() { checkEmail(); }

// Check all the important fields of to form
// and go back to field if input is wrong
function checkForm() {
    if (!checkUsername()) scrollToField(uname);
    else if (!checkPassword()) scrollToField(password);
    else if (!checkFname()) scrollToField(fname);
    else if (!checkLname()) scrollToField(lname);
    else if (!checkZipcode()) scrollToField(zipcode);
    else if (!checkEmail()) scrollToField(email);
    else return true;
    return false;
}

// Scroll to the field with an offset,
// put cursor at end of field, and
// animate the field
function scrollToField(field) {
    let fieldOffset = field.getBoundingClientRect().top;
    let extraOffset = 100;
    let offset = fieldOffset + window.pageYOffset - extraOffset;
    window.scrollTo({ top: offset, behavior: "smooth" })
    field.selectionStart = field.selectionEnd = field.value.length;
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
    field.style.border = "2px solid red";
    error.style.color = "red";
    error.style.display = "inline-block";
}

// Change css because field is good
function noError(field, error) {
    field.style.border = "2px solid green";
    error.style.color = "green";
    error.style.display = "inline-block";
    error.innerHTML = "Looks good!";
}

function checkUsername() {
    if (username.value.length < 5 || username.value.length > 12) {
        hasError(username, unameError);
        unameError.innerHTML = "Username must be between 5 and 12 characters long.";
        return false;
    }
    else if (!/[A-Z]/.test(username.value.charAt(0))) {
        hasError(username, unameError);
        unameError.innerHTML = "Username must start with an uppercase letter.";
        return false;
    }
    else if (!(/\d|\W/.test(username.value.charAt(username.value.length-1)))) {
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
    else if (!(/[A-Z]/.test(password.value) && /[a-z]/.test(password.value)
                && /\d/.test(password.value) && /\W/.test(password.value))) {
        hasError(password, passwordError);
        passwordError.innerHTML = "Password must contain all of the following: uppercase letters, lowercase letters, numbers, symbols.";
        return false;
    }
    else if (password.value.length < 14) {
        password.style.border = "2px solid darkorange"
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

function noPasswordError() {
    passwordError.style.color = "green";
    passwordError.style.display = "inline-block";
    password.style.border = "2px solid green";
    passwordError.innerHTML = "Looks good!";
}

function checkName(name) {
    if (/\d/.test(name) || /\W/.test(name)) return false;
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

function checkZipcode() {
    if (!(/\d\d\d\d[a-z][a-z]/i.test(zipcode.value)) || zipcode.value.length != 6) {
        hasError(zipcode, zipcodeError);
        zipcodeError.innerHTML = "Zipcode must be of form 1234AB.";
        return false;
    }
    else {
        noError(zipcode, zipcodeError);
        return true;
    }
}

function checkEmail() {
    if (!(/\w+@\w+\.\w{2,}/.test(email.value))) {
        hasError(email, emailError);
        emailError.innerHTML = "Email not valid.";
        return false;
    }
    else {
        noError(email, emailError);
        return true;
    }
}