async function fetchTourDetails() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    if (!email) return;

    try {
        const response = await fetch(`https://travellershubtravelandtours.com/api/auth/groupTours/details?email=${email}`);
        const tour = await response.json();

        // Populate primary traveler's general information
        document.getElementById('groupTourName').textContent = tour.groupTourName || '-';
        document.getElementById('fullName').textContent = tour.leadName || '-';
        document.getElementById('packageName').textContent = tour.packageName || '-';
        document.getElementById('status').textContent = tour.status || '-';
        document.getElementById('email').textContent = tour.email || '-';
        document.getElementById('contactNumber').textContent = tour.contactNumber || '-';
        document.getElementById('dateFrom').textContent = tour.dateFrom
            ? new Date(tour.dateFrom).toLocaleDateString()
            : '-';
        document.getElementById('dateTo').textContent = tour.dateTo
            ? new Date(tour.dateTo).toLocaleDateString()
            : '-';
        document.getElementById('adultNumber').textContent = tour.adult || 0;
        document.getElementById('childNumber').textContent = tour.child || 0;
        document.getElementById('infantNumber').textContent = tour.infant || 0;
        document.getElementById('inquiryMesage').textContent = tour.inquiryMessage || '-';

        // Populate primary traveler's files
        const primaryFiles = {
            passportID: 'passportID',
            visaID: 'visaID',
            validID: 'validID',
            birthCertificate: 'birthCertificate',
            picture: 'picture',
        };

        Object.entries(primaryFiles).forEach(([key, elementId]) => {
            const imgElement = document.getElementById(elementId);
            if (tour[key]?.path) {
                imgElement.src = tour[key].path;
                imgElement.alt = `${key} file`;
            } else {
                imgElement.src = '';
                imgElement.alt = `No ${key} available`;
            }
        });

        // Populate additional travelers
        const additionalTravelersContainer = document.getElementById('additionalTravelersContainer');
        additionalTravelersContainer.innerHTML = ''; // Clear any existing content

        if (tour.additionalTravellers?.length) {
            tour.additionalTravellers.forEach((traveler, index) => {
                const travelerSection = document.createElement('div');
                travelerSection.innerHTML = `
                    <div style="margin-bottom: 20px;">
                        <p style="font-size: 18px;"><strong>Name:</strong> ${traveler.name || 'N/A'}</p>
                        <p><strong>Passport ID:</strong></p>
                        <img class="img-fluid" style="margin-bottom: 20px;" src="${traveler.passportID?.path || ''}" alt="Passport ID">
                        <p><strong>Visa ID:</strong></p>
                        <img class="img-fluid" style="margin-bottom: 20px;" src="${traveler.visaID?.path || ''}" alt="Visa ID">
                        <p><strong>Valid ID:</strong></p>
                        <img class="img-fluid" style="margin-bottom: 20px;" src="${traveler.validID?.path || ''}" alt="Valid ID">
                        <p><strong>Birth Certificate:</strong></p>
                        <img class="img-fluid" style="margin-bottom: 20px;" src="${traveler.birthCertificate?.path || ''}" alt="Birth Certificate">
                        <p><strong>2x2 Picture:</strong></p>
                        <img class="img-fluid" style="margin-bottom: 20px;" src="${traveler.picture?.path || ''}" alt="2x2 Picture">
                        <hr>
                    </div>
                `;
                additionalTravelersContainer.appendChild(travelerSection);
            });
        } else {
            additionalTravelersContainer.innerHTML = '<p>No additional travelers found.</p>';
        }
    } catch (error) {
        console.error('Error fetching tour details:', error);
    }
}

// Initialize
fetchTourDetails();