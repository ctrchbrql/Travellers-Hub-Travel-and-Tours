document.addEventListener('DOMContentLoaded', async () => {
    const visaArchiveTableBody = document.getElementById('visaArchiveTableBody');
    const searchInput = document.getElementById('SearchVisaArchive');
    const sortSelectorArchive = document.getElementById('sortSelector');

    // Function to fetch and filter archived visa requirements
    async function fetchArchivedVisaData(statusFilter = 'Declined', query = '') {
        try {
            const response = await fetch(`https://travellershubtravelandtours.com/api/auth/requirements/archive?search=${query}`);
            const data = await response.json();

            visaArchiveTableBody.innerHTML = '';
            const filteredVisas = data.filter(req => req.status === statusFilter);

            filteredVisas.forEach(req => {
                visaArchiveTableBody.innerHTML += `
                    <tr>
                        <td>${req.name}</td>
                        <td>${req.email}</td>
                        <td>${req.status}</td>
                        <td>${new Date(req.submittedAt).toLocaleDateString()}</td>
                        <td class="text-center">
                            <a href="VisaInformationView.html?email=${req.email}" class="btn btn-info btn-sm">View</a>
                        </td>
                    </tr>`;
            });
        } catch (err) {
            console.error('Error fetching archived visa data:', err);
        }
    }

    // Handle search input
    searchInput.addEventListener('input', (e) => {
        fetchArchivedVisaData(sortSelectorArchive.value, e.target.value);
    });

    // Handle dropdown selection
    sortSelectorArchive.addEventListener('change', (e) => {
        fetchArchivedVisaData(e.target.value, searchInput.value);
    });

    // Initialize with default status "Declined"
    fetchArchivedVisaData();
});
