document.getElementById('multiStepForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Collect additional travelers' data
    const additionalTravelers = [];
    const additionalTravelerElements = document.querySelectorAll('.additional-traveler-item');
    additionalTravelerElements.forEach((travelerElement, index) => {
        const travelerData = {};
        travelerElement.querySelectorAll('input, select, textarea').forEach((input) => {
            if (input.type === 'file') {
                formData.append(`${input.name}`, input.files[0]); // File inputs
            } else {
                travelerData[input.name] = input.value; // Other inputs
            }
        });
        additionalTravelers.push(travelerData);
    });

    formData.append('additionalTravellers', JSON.stringify(additionalTravelers));

    try {
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/booking-lead', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Booking successfully submitted!');
            window.location.href = '/Clientpage'; // Redirect to homepage
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error('Error submitting form:', err);
        alert('Failed to submit booking. Please try again.');
    }
});
