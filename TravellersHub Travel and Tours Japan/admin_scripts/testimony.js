// Fetch pending testimonies and populate the admin table
function fetchPendingTestimonies() {
    fetch('https://travellershubtravelandtours.com/api/auth/get-testimonies')
        .then(response => response.json())
        .then(testimonies => {
            const tableBody = document.getElementById('testimonyDataTable');
            tableBody.innerHTML = '';

            testimonies.forEach(testimony => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${testimony.name}</td>
                    <td>${testimony.description}</td>
                    <td>${testimony.message}</td>
                    <td class="text-center">
                        <div class="btn-group" role="group">
                            <button class="btn btn-primary btn-sm" style="background: #3ba639;" onclick="acceptTestimony('${testimony._id}')">Accept</button>
                            <button class="btn btn-primary btn-sm" style="background: #e13333;" onclick="declineTestimony('${testimony._id}')">Decline</button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching testimonies:', error));
}

// Accept testimony
function acceptTestimony(id) {
    fetch(`https://travellershubtravelandtours.com/api/auth/accept-testimony/${id}`, { method: 'PATCH' })
        .then(response => response.json())
        .then(() => {
            alert('Testimony accepted!');
            fetchPendingTestimonies(); // Refresh table
        })
        .catch(error => console.error('Error accepting testimony:', error));
}

// Decline testimony
function declineTestimony(id) {
    fetch(`https://travellershubtravelandtours.com/api/auth/decline-testimony/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            alert('Testimony declined!');
            fetchPendingTestimonies(); // Refresh table
        })
        .catch(error => console.error('Error declining testimony:', error));
}

// Initialize admin functionalities on page load
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('testimonyDataTable');
    if (table) {
        fetchPendingTestimonies();
    }
});