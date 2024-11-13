const signupForm = document.getElementById('signup-form');
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

function validateForm() {
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;
    const phoneNumber = document.getElementById('phone-number').value; // Get phone number input
    const passwordError = document.getElementById('password-error');
    const repeatPasswordError = document.getElementById('repeat-password-error');
    const phoneNumberError = document.getElementById('phone-number-error'); // Error element for phone number

    const passwordPattern = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
    const phoneNumberPattern = /^\d{10}$/; // Assuming a 10-digit phone number

    let isValid = true;

    // Password validation
    if (!passwordPattern.test(password)) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Repeat password validation
    if (password !== repeatPassword) {
        repeatPasswordError.style.display = 'block';
        isValid = false;
    } else {
        repeatPasswordError.style.display = 'none';
    }

    // Phone number validation
    if (!phoneNumberPattern.test(phoneNumber)) {
        phoneNumberError.style.display = 'block';
        isValid = false;
    } else {
        phoneNumberError.style.display = 'none';
    }

    return isValid; // Prevent form submission if validation fails
}

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!validateForm()) {
        return; // Stop further execution if the form is not valid
    }

    const formData = {
        fullName: document.getElementById('full-name').value,
        email: document.getElementById('email').value, // Corrected ID
        password: document.getElementById('password').value,
        address: document.getElementById('address').value,
        phoneNumber: document.getElementById('phone-number').value
    };

    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            // Redirect to the home page on successful signup
            window.location.href = '/home';
        } else {
            // Display error message from server response
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
});

const googleButton = document.querySelector('.google-button');
googleButton.addEventListener('click', () => {
    window.location.href = 'https://accounts.google.com/signin';
});

const facebookButton = document.querySelector('.facebook-button');
facebookButton.addEventListener('click', () => {
    window.location.href = 'https://www.facebook.com/login';
});

toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('.left-section').classList.toggle('dark-mode');
    document.querySelector('.right-section').classList.toggle('dark-mode');
    document.querySelectorAll('button').forEach(button => {
        button.classList.toggle('dark-mode');
    });
});
