/* -----------------------------------------------    Create Admin    ------------------------------------------------*/
function submitCreateAdminForm() {
        // Use JavaScript to submit the form by its ID
        document.getElementById('CreateAdmin').submit();
    }

    $(document).ready(function() {
        // Handle Create Admin form submission
        $('#CreateAdmin').on('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting traditionally
    
            // Capture form values
            const formData = {
                name: $('#name').val(),
                email: $('#email').val(),
                contactNumber: $('#contactNumber').val(),
                password: $('#password').val(),
                selectRole: $('#roleSelector').val()
            };
    
            // Send the data via AJAX
            $.ajax({
                url: 'https://travellershubtravelandtours.com/api/auth/create-admin',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(response) {
                    // Display the success message as an alert
                    alert(response); // The backend response is already plain text
                    
                    // Use Bootstrap's modal hide method with a delay
                    setTimeout(function() {
                        var myModal = new bootstrap.Modal(document.getElementById('CreateAdminModal'));
                        myModal.hide();
                    }, 300);
    
                    // Reset the form
                    $('#CreateAdmin')[0].reset();
    
                    // Refresh the admin list
                    fetchAdmins(); 
                },
                error: function(error) {
                    // Display the error message as an alert
                    alert('Error: ' + (error.responseText || 'Server error'));
                    console.error('Error:', error);
                }
            });
        });


/* -----------------------------------------------    Fetch Admin for Table Display    ------------------------------------------------*/
$(document).ready(function() {
        // Fetch admin data and populate the table
        fetch('https://travellershubtravelandtours.com/api/auth/get-admins')
            .then(response => response.json())
            .then(data => {
                console.log('Admin data fetched:', data); // Debug: Log fetched data
                populateTable(data); // Populate table with admin data
            })
            .catch(error => console.error('Error fetching admins:', error));
    });
    
    function populateTable(admins) {
        const tableBody = document.getElementById('adminTableBody');
        tableBody.innerHTML = ''; // Clear existing rows
    
        admins.forEach(admin => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${admin.selectRole}</td>
                <td>${admin.name}</td>
                <td>${admin.email}</td>
                <td>${admin.contactNumber}</td>
                <td><button class="btn btn-danger removeAdminButton" data-id="${admin._id}">Remove</button></td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Removing Admin in the database
    $(document).on('click', '.removeAdminButton', function() {
        const adminId = $(this).data('id'); // Get the admin ID from the button's data attribute
    
        if (confirm('Are you sure you want to remove this admin?')) {
            $.ajax({
                url: `https://travellershubtravelandtours.com/api/auth/remove-admin/${adminId}`, // Backend route for removal
                type: 'DELETE',
                success: function(response) {
                    alert('Admin removed successfully!');
                    fetchAdmins(); // Refresh the admin list
                },
                error: function(error) {
                    console.error('Error removing admin:', error);
                    alert('Error removing admin: ' + (error.responseJSON.message || 'Server error'));
                }
            });
        }
    });

    
    // Fetch Admins again after removing one
    function fetchAdmins() {
        fetch('https://travellershubtravelandtours.com/api/auth/get-admins')
            .then(response => response.json())
            .then(data => {
                populateTable(data); // Repopulate the table with updated admin list
            })
            .catch(error => console.error('Error fetching admins:', error));
    }

    $(document).ready(function() {
        let adminsData = []; // To store all admin data for search
        let currentPage = 1;
        const itemsPerPage = 10;
    
        // Fetch Admins and initialize the table
        function fetchAdmins() {
            fetch('https://travellershubtravelandtours.com/api/auth/get-admins')
                .then(response => response.json())
                .then(data => {
                    adminsData = data; // Store all admin data
                    displayAdmins(); // Display the first page of admins
                    setupPagination(); // Initialize pagination controls
                })
                .catch(error => console.error('Error fetching admins:', error));
        }

});

    // Load admins on page load
    fetchAdmins();
});