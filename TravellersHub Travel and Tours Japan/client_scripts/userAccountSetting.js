document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('accountSettingsForm');
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    let originalPassword = ""; // To store the current password for comparison

    // Fetch session data and populate fields
    fetch('https://travellershubtravelandtours.com/api/auth/session-data-client', { method: 'GET', credentials: 'include' })
    
    .then(response => {
        console.log('Response status:', response.status);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch session data.');
        }
    })
    .then(data => {
        console.log('Fetched session data:', data);
        // Populate form fields
        document.getElementById('firstName').value = data.firstName || '';
        document.getElementById('middleName').value = data.middleName || '';
        document.getElementById('lastName').value = data.lastName || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('contactNumber').value = data.phoneNumber || '';
        document.getElementById('birthDate').value = data.birthDate || '';
        document.getElementById('address').value = data.address || '';
    })
    .catch(error => console.error('Error fetching session data:', error));


    // Enable editing when the "Edit" button is clicked
    editButton.addEventListener('click', () => {
        form.querySelectorAll('input').forEach(input => input.removeAttribute('disabled'));
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
    });

    // Handle save action
    saveButton.addEventListener('click', event => {
        event.preventDefault();

        // Validate password fields
        const newPassword = passwordField.value.trim();
        const confirmPassword = confirmPasswordField.value.trim();

        if (newPassword || confirmPassword) {
            if (newPassword === originalPassword) {
                alert('New password cannot be the same as the current password.');
                return;
            }
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
        }

        // Prepare updated data
        const updatedData = {
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('contactNumber').value,
            birthDate: document.getElementById('birthDate').value,
            address: document.getElementById('address').value,
            newPassword: newPassword || undefined, // Include password only if changing
        };

        // Send updated data to the server
        fetch('https://travellershubtravelandtours.com/api/auth/update-user-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(updatedData),
        })
            .then(response => {
                if (response.ok) {
                    alert('Account updated successfully.');
                    window.location.reload();
                } else {
                    throw new Error('Failed to update account.');
                }
            })
            .catch(error => console.error('Error:', error));
    });
});
