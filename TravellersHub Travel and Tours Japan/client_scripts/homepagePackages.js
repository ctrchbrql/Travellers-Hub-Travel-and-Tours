document.addEventListener("DOMContentLoaded", async () => {
    const packageIds = ["package_1", "package_2", "package_3", "package_4"]; // Package IDs

    try {
        // Initialize packages in session
        await fetch('https://travellershubtravelandtours.com/api/auth/packages/initialize');

        // Fetch and populate each package
        for (const id of packageIds) {
            try {
                const response = await fetch(`https://travellershubtravelandtours.com/api/auth/packages/${id}`); // Fetch package details by ID
                if (!response.ok) {
                    console.error(`Failed to fetch package with ID: ${id}`);
                    continue;
                }

                const packageData = await response.json();
                console.log(packageData);
                // Validate response
                if (!packageData || !packageData.packageId) {
                    console.error(`Package with ID ${id} not found.`);
                    continue;
                }

                // Extract numeric part from package ID (e.g., "1" from "Package_1")
                const packageNumber = id.split("_")[1];

                // Populate the DOM
                document.getElementById(`packageName_${packageNumber}`).textContent = packageData.packageName;
                document.getElementById(`description_${packageNumber}`).textContent = packageData.description;
                document.getElementById(`price_${packageNumber}`).textContent = packageData.price;

                /* Set the cover image
                const coverImage = document.getElementById(`coverImage_${packageNumber}`);
                if (coverImage) {
                    coverImage.src = packageData.coverImage?.path || "path/to/default-image.jpg"; // Provide default image fallback
                } else {
                    console.error(`Cover image element with ID coverImage_${packageNumber} not found.`);
                }*/
            } catch (error) {
                console.error(`Error fetching package with ID: ${id}`, error);
            }
        }

        // Add click event listeners to `linkcont` for saving package ID to session
        document.querySelectorAll(".linkcont").forEach(link => {
            link.addEventListener("click", async (e) => {
                const packageAnchor = e.currentTarget.closest('.tour-item').querySelector('a');

                if (packageAnchor && packageAnchor.id) {
                    const packageId = packageAnchor.id;

                    try {
                        // Save the package ID to the session
                        const saveResponse = await fetch('https://travellershubtravelandtours.com/api/auth/packages/session', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ packageId }), // Send packageId to backend
                        });

                        if (saveResponse.ok) {
                            const saveData = await saveResponse.json();
                            console.log(saveData.message);
                        } else {
                            console.error('Failed to save package ID to session:', await saveResponse.text());
                        }
                    } catch (error) {
                        console.error('Error saving package ID to session:', error);
                    }
                } else {
                    console.error('Package ID not found in the clicked link.');
                }
            });
        });
    } catch (error) {
        console.error('Error initializing packages:', error);
    }
});
