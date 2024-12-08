// CALENDAR 
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    // Load events from localStorage
    const loadEvents = () => {
      const storedEvents = localStorage.getItem('calendarEvents');
      return storedEvents ? JSON.parse(storedEvents) : [];
    };

    // Save events to localStorage
    const saveEvents = (events) => {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    };

    // Initialize calendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      editable: true, // Allow direct editing of events
      events: loadEvents(),
      dateClick: function (info) {
        // Prompt for event title first
        const title = prompt('Enter event title:');
        if (title) {
          // Prompt for travel start date (from)
          const fromDate = prompt('Enter the start date (from):', info.dateStr);
          if (fromDate) {
            // Prompt for travel end date (to)
            const toDate = prompt('Enter the end date (to):', fromDate);

            if (toDate) {
              const newEvent = {
                title,
                start: fromDate,
                end: toDate,
                allDay: true,
              };
              calendar.addEvent(newEvent);

              // Update localStorage
              const updatedEvents = calendar.getEvents().map((event) => ({
                title: event.title,
                start: event.startStr,
                end: event.endStr,
                allDay: event.allDay,
              }));
              saveEvents(updatedEvents);
            }
          }
        }
      },
      eventClick: function (info) {
        // Edit event title, start date (from), and end date (to)
        const newTitle = prompt('Edit event title:', info.event.title);
        const newFromDate = prompt('Edit start date (from):', info.event.startStr);
        const newToDate = prompt('Edit end date (to):', info.event.endStr);

        // Ask for confirmation to delete event
        const deleteOption = confirm('Would you like to remove this event?');

        if (newTitle !== null && newFromDate && newToDate) {
          info.event.setProp('title', newTitle);
          info.event.setDates(newFromDate, newToDate); // Update start and end dates

          // Update localStorage
          const updatedEvents = calendar.getEvents().map((event) => ({
            title: event.title,
            start: event.startStr,
            end: event.endStr,
            allDay: event.allDay,
          }));
          saveEvents(updatedEvents);
        } else if (deleteOption) {
          // Remove event directly
          info.event.remove();

          // Update localStorage
          const updatedEvents = calendar.getEvents().map((event) => ({
            title: event.title,
            start: event.startStr,
            end: event.endStr,
            allDay: event.allDay,
          }));
          saveEvents(updatedEvents);
        }
      },
    });

    calendar.render();
  });
   // Function to fetch session data and update the Profile dropdown
async function fetchAndDisplaySessionData() {
    try {
        const response = await fetch('https://travellershubtravelandtours.com/api/auth/session-data-client', {
            method: 'GET',
            credentials: 'include', // Include cookies to access session data
        });

        if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            const userName = data.firstName; // Extract the firstName from session data

            // Update the Profile dropdown to show "Hello [User's Name]"
            if (userName) {
                document.getElementById("Profile-Link").textContent = `Hello ${userName}`;
            }
        } else if (response.status === 401) {
            console.log("User not logged in.");
            document.getElementById("Profile-Link").textContent = `Hello Guest`;
        } else {
            console.error("Failed to fetch session data.");
        }
    } catch (error) {
        console.error("Error fetching session data:", error);
    }
}

// Call the function on page load
fetchAndDisplaySessionData();

   
   
   /* PROFILE SECTION
    // Assume `userName` contains the logged-in user's name
    const userName = "User"; // Replace with actual username variable from server or local storage

    // Update the Profile dropdown to show "Hello [User's Name]"
    if (userName) {
        document.getElementById("Profile-Link").textContent = `Hello ${userName}`;
    }*/


    // LOGOUT SECTION
    // Function to log out the user

     
    function logout() {
    // Add an event listener for the logout button
    document.getElementById('logout-button').addEventListener('click', logout);
        //session.destroy();
        console.log("System logout")
        // Remove the token from local storage
        localStorage.removeItem('token'); // or however you store it

        // Redirect to the homepage or login page
        window.location.href = '/Homepage'; // Change to the desired route
    }

   


    
    