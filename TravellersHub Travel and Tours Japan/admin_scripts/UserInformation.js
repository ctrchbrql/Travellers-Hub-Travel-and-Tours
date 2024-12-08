document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('SearchUser');
    const tableBody = document.getElementById('userTableBody');

    // Fetch and display users
    async function fetchUsers() {
        try {
            const response = await fetch('https://travellershubtravelandtours.com/api/auth/clients'); // Adjust the endpoint if needed
            const users = await response.json();

            // Populate the table body
            tableBody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${new Date(user.birthDate).toLocaleDateString()}</td>
                    <td>${user.address}</td>
                    <td>${user.status}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Search functionality
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    });

    fetchUsers(); // Load users initially
});
