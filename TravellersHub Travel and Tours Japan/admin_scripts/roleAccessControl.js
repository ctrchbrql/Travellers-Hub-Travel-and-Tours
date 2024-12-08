document.addEventListener("DOMContentLoaded", () => {
    fetch('https://travellershubtravelandtours.com/api/auth/session-data-admin')
        .then(response => response.json())
        .then(data => {
            const role = data.role;

            // Define restricted links for each role
            const linksToHide = {
                'Super Admin': [], // SuperAdmin can see all
                'Admin/Manager': ['#ManageAdmin'], // Admin can't access Manage Admin
                'Staff': ['#ManageAdmin', '#ManagePackageContent'] // Manager's restrictions
            };

            // Hide restricted links
            linksToHide[role]?.forEach(selector => {
                const link = document.querySelector(selector);
                if (link) link.style.display = 'none';
            });
        })
        .catch(err => console.error('Error fetching session data:', err));
});