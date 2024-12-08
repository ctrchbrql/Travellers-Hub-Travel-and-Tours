document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll('form[action*="https://travellershubtravelandtours.com/api/auth/package-content-store"]');

    forms.forEach(form => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const actionUrl = form.action;

            try {
                const response = await fetch(actionUrl, {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Package content created successfully!");
                    form.reset();
                } else {
                    alert(`Error: ${result.message || "Something went wrong!"}`);
                }
            } catch (error) {
                console.error("Error during form submission:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        });
    });
});