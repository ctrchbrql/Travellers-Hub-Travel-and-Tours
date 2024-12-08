document.addEventListener("DOMContentLoaded", async () => {
    const packageIds = ["package_1", "package_2", "package_3", "package_4"]; // IDs as stored in your database

    try {
        // Fetch and populate each package
        for (const id of packageIds) {
            try {
                const response = await fetch(`https://travellershubtravelandtours.com/api/auth/package-content?packageId=${id}`);
                if (!response.ok) {
                    console.error(`Failed to fetch package with ID: ${id}`);
                    continue;
                }
                
                const packageData = await response.json();

                // Check if valid data is received
                if (!packageData || !packageData.packageId) {
                    console.error(`Package with ID ${id} not found.`);
                    continue;
                }

                // Populate the package content into the DOM
                const packageNumber = id.split("_")[1]; // Extract the numeric part (e.g., "1" from "package_1")
                document.getElementById(`packageName_${packageNumber}`).textContent = packageData.packageName;
                document.getElementById(`description_${packageNumber}`).textContent = packageData.description;
                document.getElementById(`price_${packageNumber}`).textContent = packageData.price;
                if (packageData.coverImage) {
                    document
                        .querySelector(`#package${packageNumber} img`)
                        .setAttribute("src", packageData.coverImage);
                }
            } catch (error) {
                console.error(`Error fetching package with ID: ${id}`, error);
            }
        }

        // Add event listeners to track clicks on packages
        document.querySelectorAll(".linkcont").forEach(link => {
            link.addEventListener("click", async (e) => {
                const packageId = e.currentTarget.id.split("-").pop(); // Extract package ID from element ID
                const packageName = document.getElementById(`packageName_${packageId}`).textContent;

                if (packageName) {
                    // Save the clicked package's name to the session
                    try {
                        const saveResponse = await fetch('https://travellershubtravelandtours.com/api/auth/package-session-save', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ packageName }),
                        });
                        const saveData = await saveResponse.json();
                        if (saveData.message) {
                            console.log(saveData.message);
                        }
                    } catch (error) {
                        console.error('Error saving package name to session:', error);
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error fetching package data:', error);
    }
});
