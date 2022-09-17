const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmpasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)){
        showError(usernameEl,'Username cannot be blank.');
    } else if (!isBetween(username.length,min,max)){
        showError(usernameEl,'username must be between ${min} and ${max} characters.')
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checkEmail = () =>{
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)){
        showError(emailEl,'Email cannot blank.');
    } else if (!isEmailvalid(email)){
        showError(emailEl, 'Email is not valid.')
    } else{
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};
const checkPassword = () =>{
        let valid = false;

        const password = passwordEl.value.trim();

        if (!isRequired(password)){
            showError(passwordEl,'Password cannot be blank');
        } else if(!isPasswordSecure(password)){
            showError(passwordEl, 'passs must has at laest 8 characters that include at least 1 lowercase'+'character,1 uppercase characters, 1number, and 1 special character in (!@#$%^&*)');
        }else{
            showSuccess(passwordEl);
            valid = true;
        }
        return valid;
};
const checkConfirmPassword = () => {
    let valid = false;
    //check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if(!isRequired(confirmPassword)){
        showError(confirmpasswordEl, 'Please enter the password again');
    }else if (password !== confirmPassword){
        showError(confirmpasswordEl,'the password does not math');
    }else{
        showSuccess(confirmpasswordEl);
        valid = true;
    }
    return valid;
};
const isEmailvalid = (email) =>{
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z)(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}");
    return re.test(password);
};
const isRequired = value => value ===''? false: true;
const isBetween = (length, min, max) => length< min || length > max ? false : true;
const showError = (input,message) => {

    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) =>{
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent= '';
}
form.addEventListener('submit', function(e){

    e.preventDefault();

    let isUsernameValid = checkUsername(),
        isEmailvalid = checkEmail(),
        ispasswordvalid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailvalid &&
        ispasswordvalid &&
        isConfirmPasswordValid;

        if(isFormValid){

        }
});

const debounce = ( fn,delay = 1) =>{
    let timeoutId;
    return(...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }

        timeoutID = setTimeout(() =>{
            fn.apple(null,args)
        },delay);
     };
};
form.addEventListener('input', debounce(function(e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm- password':
            checkConfirmPassword();
            break;
    }
}));