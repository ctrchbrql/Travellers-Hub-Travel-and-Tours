document.getElementById('Register-Form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.redirected) {
            // Redirect to email verification page
            window.location.href = response.url;
        } else {
            const result = await response.json();
            alert(result.msg);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again.');
    }
});