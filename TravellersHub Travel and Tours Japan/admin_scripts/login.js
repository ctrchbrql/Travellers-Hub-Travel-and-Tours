document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('Admin-Login-Form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const email = document.querySelector('input[name="email"]').value;
            const password = document.querySelector('input[name="password"]').value;

            try {
                // Perform login request
                const response = await fetch('https://travellershubtravelandtours.com/api/auth/login-admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                const token = data.token;

                // Save token to localStorage for potential future use
                localStorage.setItem('token', token);

                // Redirect to Dashboard with token in query string
                window.location.href = `/Dashboard?token=${token}`;
            } catch (err) {
                console.error('Login error:', err.message);
                alert('Login failed: ' + err.message);
            }
        });
    }
});