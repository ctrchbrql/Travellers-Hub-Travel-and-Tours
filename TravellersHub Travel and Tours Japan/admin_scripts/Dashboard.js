// Fetch and update dashboard statistics
document.addEventListener('DOMContentLoaded', () => {
    const userCountElem = document.getElementById('CustomCount');
    const packageCountElem = document.getElementById('VisaCount');
    const testimonialCountElem = document.getElementById('TestimonialsCount');

    // Fetch stats from the API
    fetch('https://travellershubtravelandtours.com/api/auth/dashboard-stats')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch dashboard stats');
            }
            return response.json();
        })
        .then((data) => {
            // Update the DOM with the fetched data
            userCountElem.textContent = data.users;
            packageCountElem.textContent = data.packages;
            testimonialCountElem.textContent = data.testimonials;
        })
        .catch((error) => {
            console.error('Error fetching dashboard stats:', error);
        });
});

// Function to initialize the charts
function initializeCharts(packageData, visaData) {
    const packageCanvas = document.querySelector('.chart-area canvas[data-bss-chart*="Package"]');
    const visaCanvas = document.querySelector('.chart-area canvas[data-bss-chart*="Visa"]');

    // Create Package Overview Chart
    if (packageCanvas) {
        const ctxPackage = packageCanvas.getContext('2d');
        new Chart(ctxPackage, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: 'Packages',
                    backgroundColor: '#acf248',
                    borderColor: '#8dc53e',
                    borderWidth: 4,
                    data: packageData,
                }],
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { drawOnChartArea: false } },
                    y: { grid: { drawOnChartArea: true } },
                },
            },
        });
    }

    // Create Visa Overview Chart
    if (visaCanvas) {
        const ctxVisa = visaCanvas.getContext('2d');
        new Chart(ctxVisa, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: 'Visas',
                    backgroundColor: '#e45858',
                    borderColor: '#b12121',
                    borderWidth: 4,
                    data: visaData,
                }],
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { drawOnChartArea: false } },
                    y: { grid: { drawOnChartArea: true } },
                },
            },
        });
    }
}

// Fetch chart data and initialize charts
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://travellershubtravelandtours.com/api/auth/chart-data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch chart data');
            }
            return response.json();
        })
        .then(data => {
            initializeCharts(data.packages, data.visas);
        })
        .catch(error => {
            console.error('Error initializing charts:', error);
        });
});

