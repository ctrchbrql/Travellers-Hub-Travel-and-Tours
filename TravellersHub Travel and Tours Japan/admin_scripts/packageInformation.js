let userRole = ''; // To store the role

// Function to fetch session data and determine user role
async function fetchSessionData() {
    try {
        const response = await fetch('https://travellershubtravelandtours.com/api/session-data-admin');
        if (response.ok) {
            const sessionData = await response.json();
            userRole = sessionData.role; // Save the role
        } else {
            console.error('Failed to fetch session data');
        }
    } catch (error) {
        console.error('Error fetching session data:', error);
    }
}

// Function to fetch tours and populate the table
async function fetchTours(statusFilter = 'Pending') {
    const response = await fetch('https://travellershubtravelandtours.com/api/auth/groupTours');
    const tours = await response.json();

    const tableBody = document.getElementById('packageTableBody');
    tableBody.innerHTML = '';

    const filteredTours = tours.filter(tour => tour.status === statusFilter);

    filteredTours.forEach(tour => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="max-width: 200px;">
                    ${userRole !== 'Staff' && tour.status === 'Pending' ? `
                        <button class="btn btn-primary btn-sm" style="background: #3ba639;" onclick="updateStatus('${tour.email}', 'Accepted')">Accept</button>
                        <button class="btn btn-danger btn-sm" style="background: #e13333;" onclick="updateStatus('${tour.email}', 'Declined')">Decline</button>
                    ` : ''}
                    ${userRole !== 'Staff' && tour.status === 'Accepted' ? `
                        <button class="btn btn-danger btn-sm" onclick="updateStatus('${tour.email}', 'Archived')">Archive</button>
                    ` : ''}
                </div>
            </td>
            <td>${tour.leadName}</td>
            <td>${tour.email}</td>
            <td>${tour.packageName}</td>
            <td>${tour.groupTourName}</td>
            <td>${tour.status}</td>
            <td><a href="PackageInformationView.html?email=${tour.email}" class="btn btn-primary btn-sm" style="background: #08addc;">View</a></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to update the status
async function updateStatus(email, status) {
    try {
        const response = await fetch(`https://travellershubtravelandtours.com/api/auth/groupTours/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, status }),
        });

        if (response.ok) {
            alert(`Status successfully updated to ${status}.`);
            const currentStatus = document.getElementById('sortSelector').value;
            fetchTours(currentStatus); // Refresh the table based on the selected status
        } else {
            const errorMessage = await response.json();
            alert(`Failed to update status: ${errorMessage.error || response.statusText}`);
        }
    } catch (error) {
        alert('An error occurred while updating the status. Please try again.');
        console.error('Error updating status:', error);
    }
}

// Event listener for dropdown selection change
document.getElementById('sortSelector').addEventListener('change', (event) => {
    const selectedStatus = event.target.value;
    fetchTours(selectedStatus);
});

// Search functionality
document.getElementById('SearchPackage').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    document.querySelectorAll('#packageTableBody tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(searchValue) ? '' : 'none';
    });
});

// Fetch session data and initialize the table
fetchSessionData().then(() => fetchTours());