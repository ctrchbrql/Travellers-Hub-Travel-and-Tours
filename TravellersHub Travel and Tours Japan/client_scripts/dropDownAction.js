document.getElementById("logout-button").addEventListener("click", async () => {
    try {
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Ensure cookies are sent with the request
        });

        if (response.ok) {

            alert("Logged out successfully");
            window.location.href = '/Homepage'; // Redirect to the login page
        } else {
            alert("Logout failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during logout:", error);
        alert("An error occurred. Please try again.");
    }   
});