document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://travellershubtravelandtours.com/api/auth/package-content";
    const sessionSaveUrl = "https://travellershubtravelandtours.com/api/auth/package-session-save"; // New endpoint URL

    // Static packageId for hard-coded implementation
    const packageId = "package_4"; // Change this to the desired package ID

    // Fetch package data from the API
    fetch(`${apiUrl}?packageId=${packageId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching package details: ${response.statusText}`);
            }
            return response.json();
        })
        .then(async (data) => {
            console.log(data); // Log API response

            // Map API data to DOM elements
            const packageNameElement = document.getElementById("packageName");
            const descriptionElement = document.getElementById("description");
            const priceElement = document.getElementById("price");
            const tourHighlightsElement = document.getElementById("tourHighlights");
            const inclusionExclusionElement = document.getElementById("inclusionExclusion");
            const itineraryElement = document.getElementById("itinerary");
            const remindersElement = document.getElementById("reminders");
            const coverImageElement = document.getElementById("coverImage");
            const flyerImageElement = document.getElementById("flyer");

            // Populate text content
            if (packageNameElement) packageNameElement.textContent = data.packageName || "-";
            if (descriptionElement) descriptionElement.textContent = data.description || "-";
            if (priceElement) priceElement.textContent = data.price || "-";
            if (tourHighlightsElement) tourHighlightsElement.textContent = data.tourHighlights || "-";
            if (inclusionExclusionElement) inclusionExclusionElement.textContent = data.inclusionExclusion || "-";
            if (itineraryElement) itineraryElement.textContent = data.itinerary || "-";
            if (remindersElement) remindersElement.textContent = data.reminders || "-";

            // Set cover image background dynamically with base64
            if (coverImageElement && data.coverImage) {
                coverImageElement.style.backgroundImage = `url('${data.coverImage}')`;
            }

            // Set flyer image source dynamically with base64
            if (flyerImageElement && data.flyer) {
                flyerImageElement.src = data.flyer;
            }

            // Save package name to session
            if (data.packageName) {
                try {
                    const sessionSaveResponse = await fetch(sessionSaveUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ packageName: data.packageName }), // Send packageName to backend
                    });

                    if (sessionSaveResponse.ok) {
                        const saveResponseData = await sessionSaveResponse.json();
                        console.log("Package name saved to session:", saveResponseData.message);
                    } else {
                        console.error("Failed to save package name to session:", await sessionSaveResponse.text());
                    }
                } catch (error) {
                    console.error("Error saving package name to session:", error);
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});