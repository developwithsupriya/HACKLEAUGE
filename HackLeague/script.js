// script.js
const form = document.getElementById('signin-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/register', { // Replace with your backend API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            // Successful registration/login
            console.log('Success!');
            // Redirect or show a success message
        } else {
            // Handle errors
            console.error('Error:', response.statusText);
            // Show an error message
        }
    } catch (error) {
        console.error('Error:', error);
        // Show an error message
    }
});