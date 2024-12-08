document.getElementById('Sign-In-Form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect form data
    const email = document.getElementById('Email-Text-Box').value;
    const password = document.getElementById('Password-Text-Box').value;

    try {
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            // Redirect based on the packageID or fallback to /Clientpage
            window.location.href = data.redirectTo;
        } else {
            // Show alert message
            alert(data.msg);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
