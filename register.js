function checkForm() {
    let username = document.forms["registerform"]["uname"].value;
    if (username.length < 5 || username.length > 12) {
        alert("Username must be between 5 and 12 characters long." + username.charAt(0) + username.charAt(username.length-1));
        return false;
    }
    else if (!/[A-Z]/.test(username.charAt(0))) {
        let message = "Username must start with an uppercase letter.";
        alert(message);
        return false;
    }
    else if (!(/\d/.test(username.charAt(username.length-1))
                || /\W/.test(username.charAt(username.length-1)))) {
        alert("Username must end with either a digit, or a special character.");
        return false;
    }
}