// Function to fetch package data and populate cards
async function populatePackages() {
    try {
        // Fetch the package data from the server for specific package IDs
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/package-content-list');
        if (!response.ok) throw new Error('Failed to fetch package data.');

        const packages = await response.json();

        // Define the mapping for package IDs to card elements
        const packageMapping = {
            "package_1": { card: "firstPackage", name: "firstPackageName", description: "firstPackageDescription" },
            "package_2": { card: "secondPackage", name: "secondPackageName", description: "secondPackageDescription" },
            "package_3": { card: "thirdPackage", name: "thirdPackageName", description: "thirdPackageDescription" },
            "package_4": { card: "fourthPackage", name: "fourthPackageName", description: "fourthPackageDescription" },
        };

        // Populate cards with the fetched data
        packages.forEach((pkg) => {
            const elements = packageMapping[pkg.packageId];
            if (!elements) return;

            document.getElementById(elements.name).textContent = pkg.packageName || '-';
            document.getElementById(elements.description).textContent = pkg.description || '-';
        });
    } catch (error) {
        console.error('Error populating packages:', error);
    }
}

// Call the function when the page is loaded
document.addEventListener('DOMContentLoaded', populatePackages);
