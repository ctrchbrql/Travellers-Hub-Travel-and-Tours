/* -----------------------------------------------    Profile Data Dispaly    ------------------------------------------------*/document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the session data from the backend
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/session-data-admin', {
            method: 'GET',
            credentials: 'include' // Include cookies for session
        });

        if (response.status === 401) {
            console.log('Not logged in');
            return;
        }

        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }

        // Parse the response JSON
        const sessionData = await response.json();
        console.log('Session data:', sessionData);

        // Populate the profile spans
        document.getElementById('nameDisplay').textContent = sessionData.name || '-';
        document.getElementById('roleDisplay').textContent = sessionData.role || '-';
        document.getElementById('emailDisplay').textContent = sessionData.email || '-';
        document.getElementById('contactNumberDisplay').textContent = sessionData.contactNumber || '-';
    } catch (error) {
        console.error('Error fetching session data:', error);
    }
});


/* -----------------------------------------------   Update Profile     ------------------------------------------------*/
document.getElementById('updateProfileButton').addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();

    try {
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/edit-profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, contactNumber }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Update displayed profile info
            document.getElementById('nameDisplay').textContent = name;
            document.getElementById('emailDisplay').textContent = email;
            document.getElementById('contactNumberDisplay').textContent = contactNumber;
        } else {
            alert(data.message || 'Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
    }
});



/* -----------------------------------------------   Change Password     ------------------------------------------------*/
document.getElementById('changePasswordButton').addEventListener('click', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    try {
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/change-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, confirmPassword }),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Clear password fields
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
        } else {
            alert(data.message || 'Failed to change password');
        }
    } catch (error) {
        console.error('Error changing password:', error);
        alert('Error changing password');
    }
});
