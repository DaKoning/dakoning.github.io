let form = document.forms["signinform"];

let email = form["email"];
let password = form["psw"];

let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

// Check for all important fields whether they are correct
// upon page load (and there's already something filled in)
// or on keypress in that field

if (email.value.length != 0) checkEmail();
email.onkeyup = function() { checkEmail(); }

if (password.value.length != 0) checkPassword(); 
password.onkeyup = function() { checkPassword(); }

// Check all the important fields of to form
// and go back to field if input is wrong
function checkForm() {
    if (!checkEmail()) scrollToField(email);
    else if (!checkPassword()) scrollToField(password);
    else {
        return true;
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
