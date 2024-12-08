// Fetch session data and populate full name in the form
function populateFullName() {
    fetch('https://travellershubtravelandtours.com/api/auth/session-data-client')
        .then(response => response.json())
        .then(data => {
            if (data.firstName && data.lastName) {
                const fullName = `${data.firstName} ${data.middleName || ''} ${data.lastName}`.trim();
                document.getElementById('full-name').value = fullName;
            }
        })
        .catch(error => console.error('Error fetching session data:', error));
}

// Initialize the form with session data
document.addEventListener('DOMContentLoaded', () => {
    const fullNameInput = document.getElementById('full-name');
    if (fullNameInput) {
        populateFullName();
    }
});


//testimonies.js (inside client_scripts)
$(document).ready(function () {
    // Fetch testimonials for both Clientpage and Homepage
    if ($('#clientTestimonialsDisplay').length) {
        fetchTestimonials('clientTestimonialsDisplay');
    }
    if ($('#homeTestimonialsDisplay').length) {
        fetchTestimonials('homeTestimonialsDisplay');
    }
});

function fetchTestimonials(targetId) {
    fetch('https://travellershubtravelandtours.com/api/auth/accepted-testimonials')
        .then(response => response.json())
        .then(testimonials => {
            console.log(`Fetched Testimonials for ${targetId}:`, testimonials);

            if (testimonials.length) {
                const $container = $(`#${targetId}`); // Dynamically target the correct container
                $container.html(''); // Clear existing items

                testimonials.forEach(testimonial => {
                    const itemHTML = `
                        <div class="item testimonial-card">
                            <main class="test-card-body">
                                <div class="quote">
                                    <i class="fa fa-quote-left"></i>
                                    <h2><span>${testimonial.description || '-'}</span></h2>
                                </div>
                                <p><span>${testimonial.message || '-'}</span></p>                 
                            </main>
                            <div class="profile">
                                <div class="profile-desc">
                                    <span>${testimonial.name || '-'}</span>
                                </div>
                            </div>
                        </div>`;
                    $container.append(itemHTML);
                });

                // Reinitialize Owl Carousel for the specific target
                initializeCarousel(targetId);
            } else {
                console.log(`No accepted testimonials found for ${targetId}.`);
            }
        })
        .catch(error => {
            console.error(`Error fetching testimonials for ${targetId}:`, error);
        });
}

function initializeCarousel(targetId) {
    $(`#${targetId}`).owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 6000,
        margin: 10,
        nav: true,
        navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
        responsive: {
            0: { items: 1, nav: false },
            600: { items: 1, nav: true },
            768: { items: 2 },
        }
    });
}
