const errorClass = 'text-DGXgreen'
const validClass = 'text-red-500'

export const validateRequired = (field) => {
    const inputField = document.getElementById(field);
    const errorElement = document.getElementById(`${field}Verify`);
    if (inputField.value === '') {
        inputField.classList.remove('is-valid');
        inputField.classList.add('is-invalid');
        errorElement.classList.remove(errorClass);
        errorElement.classList.add(validClass);
        errorElement.textContent = 'This field is required';
    } else {
        inputField.classList.remove('is-invalid');
        inputField.classList.add('is-valid');
        errorElement.classList.remove(validClass);
        errorElement.classList.add(errorClass);
        errorElement.textContent = 'Looks Great!';
    }
}

export const validatePhone = (phoneInput, phoneValue) => {
    const phoneVerify = document.getElementById('phoneNoVerify');
    if (!/^[6-9]\d{9}$/.test(phoneValue)) {
        phoneInput.classList.remove('is-valid');
        phoneInput.classList.add('is-invalid');
        phoneVerify.classList.remove(errorClass);
        phoneVerify.classList.add(validClass);
        phoneVerify.textContent = 'Phone Number Is Invalid';
    } else {
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
        phoneVerify.classList.remove(validClass);
        phoneVerify.classList.add(errorClass);
        phoneVerify.textContent = "That's Okay";
    }
}
export const validateEmail = (emailInput, emailValue) => {
    const emailVerify = document.getElementById('emailVerify');
    if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
        emailVerify.classList.remove(errorClass);
        emailVerify.classList.add(validClass);
        emailVerify.textContent = 'Enter a valid email address';
    } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        emailVerify.classList.remove(validClass);
        emailVerify.classList.add(errorClass);
        emailVerify.textContent = "Good to Go!";
    }
}

export const validatePassword = (passwordInput, passwordValue) => {

    const passwordVerify = document.getElementById(passwordInput.id + 'Verify');
    let errorMessage = '';
    if (passwordValue.length < 8) {
        errorMessage += 'Password must be at least 8 characters long';
    }
    if (!/\d/.test(passwordValue)) {
        errorMessage += ', must contain at least one digit';
    }
    // eslint-disable-next-line no-useless-escape
    if (!/[!@#$%^&*()_+={}\[\]:;<>,.?/~]/.test(passwordValue)) {
        errorMessage += ', one special character';
    }
    if (!/[a-z]/.test(passwordValue)) {
        errorMessage += ', one lowercase letter';
    }
    if (!/[A-Z]/.test(passwordValue)) {
        errorMessage += ', one uppercase letter';
    }
    if (errorMessage) {
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');
        passwordVerify.classList.remove(errorClass);
        passwordVerify.classList.add(validClass);
        passwordVerify.textContent = errorMessage;
    } else {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
        passwordVerify.classList.remove(validClass);
        passwordVerify.classList.add(errorClass);
        passwordVerify.textContent = 'That looks kind of strong password';
    }
}

export const validateConfirmPassword = (passwordValue, confirmPasswordValue, confirmPasswordInput) => {
    const conPasswordVerify = document.getElementById(confirmPasswordInput.id + 'Verify');
    if (confirmPasswordValue !== '') {
        if (!(confirmPasswordValue === passwordValue)) {
            confirmPasswordInput.classList.remove('is-valid');
            confirmPasswordInput.classList.add('is-invalid');
            conPasswordVerify.classList.remove(errorClass);
            conPasswordVerify.classList.add(validClass);
            conPasswordVerify.textContent = 'Password and Confirm Passwords do not match';
        } else {
            confirmPasswordInput.classList.remove('is-invalid');
            confirmPasswordInput.classList.add('is-valid');
            conPasswordVerify.classList.remove(validClass);
            conPasswordVerify.classList.add(errorClass);
            conPasswordVerify.textContent = 'Very Good! Password Matched';
        }
    }
    else{
        confirmPasswordInput.classList.remove('is-valid');
        confirmPasswordInput.classList.add('is-invalid');
        conPasswordVerify.classList.remove(errorClass);
        conPasswordVerify.classList.add(validClass);
        conPasswordVerify.textContent = 'This field is required';
    }
}