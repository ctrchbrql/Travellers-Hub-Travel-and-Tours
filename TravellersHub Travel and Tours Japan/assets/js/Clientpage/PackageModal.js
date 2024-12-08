// FUNCTION OF FLYERS MODAL
// Get the modal for flyers
const flyerModal = document.getElementById("imageModal");

// Get the image inside the modal for flyers
const flyerModalImage = document.getElementById("modalImage");

// Get the button that opens the flyer modal
const flyerBtn = document.getElementById("flyers-button");

// Get the <span> element that closes the flyer modal
const flyerClose = document.getElementsByClassName("close")[0];

// Open the flyer modal when the button is clicked
flyerBtn.onclick = function() {
    flyerModal.style.display = "block";
};

// Close the flyer modal when the user clicks on <span> (x)
flyerClose.onclick = function() {
    flyerModal.style.display = "none";
};

// Close the flyer modal when the user clicks anywhere outside the modal content
window.onclick = function(event) {
    if (event.target === flyerModal) {
        flyerModal.style.display = "none";
    }
}; 

/* FUNCTION OF STEP FORM 
      // JavaScript to manage steps and submission alert
      function nextStep(step) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach((formStep) => {
            formStep.style.display = 'none';
        });
        // Show the selected step
        if (step === 3) {
            alert("You successfully submitted");  // Success alert before payment step
        }
        document.getElementById(
            step === 1 ? 'GroupTourBooking' : 
            step === 2 ? 'AddTravelersForm' : 
            'paymentMethodForm'
        ).style.display = 'block';
    }*/

        function nextStep(step) {
          // Helper function to validate required fields in the current step
          function validateRequiredFields(formId) {
              const form = document.getElementById(formId);
              let isValid = true;
      
              // Find all required inputs, textareas (excluding inquiryMessage), and selects
              form.querySelectorAll('input[required], textarea:not(#inquiryMessage)[required], select[required]').forEach((field) => {
              if (field.type === "file") {
                      // Validate file uploads
                      if (!field.files || field.files.length === 0) {
                          isValid = false;
                          field.style.border = '1px solid red';
                          /*alert(`Please upload the required file for "${field.name || field.id}".`); */
                      } else {
                          field.style.border = ''; // Reset border style if valid
                      }
                  } else {
                      // Validate other fields
                      if (!field.value.trim()) {
                          isValid = false;
                          field.style.border = '1px solid red';
                          /*(alert(`Please fill out the field.`);*/
                      } else {
                          field.style.border = ''; // Reset border style if valid
                      }
                  }
              });
      
              return isValid;
          }
      
          // Validation logic for each step
          if (step === 2 && !validateRequiredFields('GroupTourBooking')) {
              return; // Prevent moving to step 2 if validation fails
          }
          if (step === 3 && !validateRequiredFields('AddTravelersForm')) {
              return; // Prevent moving to step 3 if validation fails
          }
      
          // Hide all steps
          document.querySelectorAll('.form-step').forEach((formStep) => {
              formStep.style.display = 'none';
          });
      
          // Show the selected step
          const formId =
              step === 1 ? 'GroupTourBooking' :
              step === 2 ? 'AddTravelersForm' :
              'paymentMethodForm';
          document.getElementById(formId).style.display = 'block';
      
          // Display success alert at the end
          if (step === 3) {
              alert("You are almost done. Complete your payment method."); 
          }
      }
      

    // Handle final form submission (BOOK NOW)
    function submitForm() {
        //alert("Your booking has been sent to the admin.");
        document.getElementById('bookNowButton').submit();
        console.log("Book now button is working");

    }

    /*
    // FUNCTION OF PAYMENT MODE MODAL
    // GCASH MODAL
    // Open the modal
    function openGcashModal() {
      document.getElementById('gcashModal').style.display = 'block';
    }

    // Close the modal
    function closeGcashModal() {
      document.getElementById('gcashModal').style.display = 'none';
    }

    // Bank MODAL
    // Open the modal
    function openBankModal() {
      document.getElementById('bankModal').style.display = 'block';
    }

    // Close the modal
    function closeBankModal() {
      document.getElementById('bankModal').style.display = 'none';
    }*/

  // FUNCTION OF ADDITIONAL TRAVELLERS 
  
  /*// Function to add a new traveler form section
  let travelerCount = 1;
    document.getElementById('addTravelerButton').addEventListener('click', function() {
      travelerCount++;
      const newTraveler = document.createElement('div');
      newTraveler.classList.add('additional-traveler-item');
      newTraveler.innerHTML = `
        <button type="button" class="remove-item" onclick="removeTraveler(this)">✖ Traveler ${travelerCount}</button>
        <div class="form-container">
          <div class="form-group">
            <label for="fullName">Name</label>
            <input type="text" name="fullName_${travelerCount}" placeholder="Full Name" required class="form-control">
          </div>
        </div>
        
        <!-- Traveler's Documents -->
        <form action="/upload" method="post" enctype="multipart/form-data">
          <div class="row">
            <!-- Passport ID Upload -->
            <div class="form-group col-6">
              <label>Please upload your Passport ID</label>
              <div class="upload-area" style="border: 1px dashed #ccc; padding: 10px; text-align: center; cursor: pointer; margin-bottom: 10px;">
                <input 
                  type="file" 
                  name="passport_${travelerCount}" 
                  accept=".jpg, .jpeg, .png, .pdf" 
                  style="display: none;" 
                  onchange="validateFileSize(this)"
                >
                <div onclick="this.previousElementSibling.click();">
                  <img src="../../assets/img/browse files.png" alt="Upload Icon" style="width: 25px; height: 25px;">
                  <p style="font-size: 12px; margin: 5px 0;">Browse Files</p>
                  <small style="font-size: 10px;">Drag and drop files here</small><br>
                  <small style="font-size: 10px;">jpg, jpeg, png, pdf (1mb max.)</small>
                </div>
              </div>
            </div>

            <!-- Visa ID Upload -->
            <div class="form-group col-6">
              <label>Please upload your Visa ID</label>
              <div class="upload-area" style="border: 1px dashed #ccc; padding: 10px; text-align: center; cursor: pointer; margin-bottom: 10px;">
                <input 
                  type="file" 
                  name="visa_${travelerCount}" 
                  accept=".jpg, .jpeg, .png, .pdf" 
                  style="display: none;" 
                  onchange="validateFileSize(this)"
                >
                <div onclick="this.previousElementSibling.click();">
                  <img src="../../assets/img/browse files.png" alt="Upload Icon" style="width: 25px; height: 25px;">
                  <p style="font-size: 12px; margin: 5px 0;">Browse Files</p>
                  <small style="font-size: 10px;">Drag and drop files here</small><br>
                  <small style="font-size: 10px;">jpg, jpeg, png, pdf (1mb max.)</small>
                </div>
              </div>
            </div>

            <!-- Valid ID Upload -->
            <div class="form-group col-6">
              <label>Please upload your Valid ID</label>
              <div class="upload-area" style="border: 1px dashed #ccc; padding: 10px; text-align: center; cursor: pointer; margin-bottom: 10px;">
                <input 
                  type="file" 
                  name="validId_${travelerCount}" 
                  id="validId" 
                  accept=".jpg, .jpeg, .png, .pdf" 
                  style="display: none;" 
                  onchange="validateFileSize(this)"
                >
                <div onclick="document.getElementById('validId').click();">
                  <img src="../../assets/img/browse files.png" alt="Upload Icon" style="width: 25px; height: 25px;">
                  <p style="font-size: 12px; margin: 5px 0;">Browse Files</p>
                  <small style="font-size: 10px;">Drag and drop files here</small><br>
                  <small style="font-size: 10px;">jpg, jpeg, png, pdf (1mb max.)</small>
                </div>
              </div>
            </div>

            <!-- Birth Certificate Upload -->
            <div class="form-group col-6">
              <label>Please upload your Birth Certificate</label>
              <div class="upload-area" style="border: 1px dashed #ccc; padding: 10px; text-align: center; cursor: pointer; margin-bottom: 10px;">
                <input 
                  type="file" 
                  name="birthCertificate_${travelerCount}" 
                  id="birthCertificate" 
                  accept=".jpg, .jpeg, .png, .pdf" 
                  style="display: none;" 
                  onchange="validateFileSize(this)"
                >
                <div onclick="document.getElementById('birthCertificate').click();">
                  <img src="../../assets/img/browse files.png" alt="Upload Icon" style="width: 25px; height: 25px;">
                  <p style="font-size: 12px; margin: 5px 0;">Browse Files</p>
                  <small style="font-size: 10px;">Drag and drop files here</small><br>
                  <small style="font-size: 10px;">jpg, jpeg, png, pdf (1mb max.)</small>
                </div>
              </div>
            </div>

            <!-- 2x2 Picture Upload -->
            <div class="form-group col-6" style="margin: 0 auto;">
              <label>Please upload your 2x2 picture</label>
              <div class="upload-area" style="border: 1px dashed #ccc; padding: 10px; text-align: center; cursor: pointer; margin-bottom: 10px;">
                <input 
                  type="file" 
                  name="picture_${travelerCount}" 
                  id="picture" 
                  accept=".jpg, .jpeg, .png" 
                  style="display: none;" 
                  onchange="validateFileSize(this)"
                >
                <div onclick="document.getElementById('picture').click();">
                  <img src="../../assets/img/browse files.png" alt="Upload Icon" style="width: 25px; height: 25px;">
                  <p style="font-size: 12px; margin: 5px 0;">Browse Files</p>
                  <small style="font-size: 10px;">Drag and drop files here</small><br>
                  <small style="font-size: 10px;">jpg, jpeg, png (1mb max.)</small>
                </div>
              </div>
            </div>
          </div>
        </form>
      `;
      document.getElementById('additionalTravelersContainer').appendChild(newTraveler);
    });

    // Function to remove a traveler form section
    function removeTraveler(button) {
      button.parentElement.remove();
    } */

   /*// Function to validate file and display preview (FOR PAYMENT RECEIPT)
    function validateAndDisplayFilePreview(input) {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf']; // Allowed file extensions
        const file = input.files[0];
        const uploadContent = document.getElementById('uploadContent');
        const filePreview = document.getElementById('filePreview');
        const previewContent = document.getElementById('previewContent');

        if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (file.size > maxSize) {
            alert('File size should not exceed 5MB');
            resetUpload(); // Reset UI
            return;
        }

        if (!allowedExtensions.includes(fileExtension)) {
            alert('Only files with extensions jpg, jpeg, png, and pdf are allowed');
            resetUpload(); // Reset UI
            return;
        }

        // Clear previous preview content
        previewContent.innerHTML = '';

        // Display preview based on file type
        if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            const reader = new FileReader();
            reader.onload = function (e) {
            previewContent.innerHTML = `<img src="${e.target.result}" alt="Uploaded File" style="max-width: 100%; height: auto;"/>`;
            };
            reader.readAsDataURL(file);
        } else if (fileExtension === 'pdf') {
            previewContent.innerHTML = `
            <p><b>Uploaded File:</b> ${file.name}</p>
            <p style="font-size: 12px; color: gray;">Preview is not available for PDF files.</p>
            `;
        }

        // Hide initial content and show preview
        uploadContent.style.display = 'none';
        filePreview.style.display = 'block';
        }
    }

    // Function to reset the upload
    function resetUpload() {
        const input = document.getElementById('paymentReceipt');
        const uploadContent = document.getElementById('uploadContent');
        const filePreview = document.getElementById('filePreview');

        input.value = ''; // Clear the file input
        uploadContent.style.display = 'block'; // Show initial content
        filePreview.style.display = 'none'; // Hide file preview
    } */



        
    /* Function to validate file and display preview
    function validateAndDisplayFilePreview(input, field) {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf']; // Allowed file extensions
        const file = input.files[0];
        const uploadContent = document.getElementById(`${field}UploadContent`);
        const filePreview = document.getElementById(`${field}FilePreview`);
        const previewContent = document.getElementById(`${field}PreviewContent`);

        if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (file.size > maxSize) {
            alert('File size should not exceed 5MB');
            resetUpload(field); // Reset UI
            return;
        }

        if (!allowedExtensions.includes(fileExtension)) {
            alert('Only files with extensions jpg, jpeg, png, and pdf are allowed');
            resetUpload(field); // Reset UI
            return;
        }

        // Clear previous preview content
        previewContent.innerHTML = '';

        // Display preview based on file type
        if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            const reader = new FileReader();
            reader.onload = function (e) {
            previewContent.innerHTML = `<img src="${e.target.result}" alt="Uploaded File" style="max-width: 100%; height: auto;"/>`;
            };
            reader.readAsDataURL(file);
        } else if (fileExtension === 'pdf') {
            previewContent.innerHTML = `
            <p><b>Uploaded File:</b> ${file.name}</p>
            <p style="font-size: 12px; color: gray;">Preview is not available for PDF files.</p>
            `;
        }

        // Hide initial content and show preview
        uploadContent.style.display = 'none';
        filePreview.style.display = 'block';
        }
    }*/
/* Function to validate file and display file name
function validateAndDisplayFilePreview(input, id) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
  const file = input.files[0];

  const uploadArea = document.getElementById(`${id}UploadArea`);
  const uploadContent = document.getElementById(`${id}UploadContent`);
  const filePreview = document.getElementById(`${id}FilePreview`);

  if (file) {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (file.size > maxSize) {
      alert("File size should not exceed 5MB");
      resetUpload(id);
      return;
    }

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Only jpg, jpeg, png, and pdf files are allowed");
      resetUpload(id);
      return;
    }

    // Update the upload area to display "File Uploaded" message
    uploadArea.innerHTML = `<div style="font-size: 16px; color: green; font-weight: bold;">File Uploaded</div>`;
    
    // Optionally, hide the file preview or display a success message only
    filePreview.style.display = "none";
  }
}

function resetUpload(id) {
  const input = document.getElementById(id);
  const uploadArea = document.getElementById(`${id}UploadArea`);
  const uploadContent = document.getElementById(`${id}UploadContent`);
  const filePreview = document.getElementById(`${id}FilePreview`);

  input.value = "";
  uploadArea.innerHTML = `<div style="font-size: 12px; margin-top: 10px; color: #555;">No file selected.</div>`;
  uploadContent.style.display = "block";
  filePreview.style.display = "none";
}*/

// Initialize traveler count

/*---------------------- ADDITIONAL TRAVELLERS SCRIPT-----------------------*/
function addTraveler() {
  const additionalTravelersContainer = document.getElementById("additionalTravelersContainer");
  const firstTraveler = document.querySelector(".additional-traveler-item");
  const newTraveler = firstTraveler.cloneNode(true);

  // Increment traveler count
  const travelerCount = additionalTravelersContainer.children.length + 1;

  // Update IDs and names for inputs
  newTraveler.querySelectorAll("input, select, textarea").forEach((input) => {
      const baseName = input.name.replace(/_\d+$/, "");
      input.id = `${baseName}_${travelerCount}`;
      input.name = `${baseName}_${travelerCount}`;
      input.value = ""; // Clear values for cloned fields
  });

  // Update remove button
  const removeButton = newTraveler.querySelector(".remove-item");
  removeButton.innerText = `✖ Remove Traveler ${travelerCount}`;
  removeButton.addEventListener("click", function () {
      additionalTravelersContainer.removeChild(newTraveler);
  });

  // Append cloned traveler section
  additionalTravelersContainer.appendChild(newTraveler);
}



/*---------------------- PAYMENT MODAL -----------------------*/
// Function to send GCash payment email
function gcashButtonEmail() {
  fetch('https://travellershubtravelandtours.com/api/auth/session-data-client')
      .then((response) => {
          if (response.ok) return response.json();
          throw new Error('Unable to fetch session data.');
      })
      .then((sessionData) => {
          const { firstName, email } = sessionData;

          const emailBody = `
              Hello ${firstName},<br><br>
              Thank you for booking an appointment with us. Please proceed to the payment using GCash.<br><br>
              <strong>Payment Details:</strong><br>
              <ul>
                  <li><strong>GCash Account:</strong> John Doe</li>
                  <li><strong>Reservation fee:</strong> 5,000</li>
                  <li><strong>Number:</strong> 09123456789</li>
              </ul>
              <strong>Scan the QR code to pay:</strong><br>
              <img src="https://i.imgur.com/bdCWUDS.png" alt="QR Code" style="width: 150px; height: auto;">
          `;
          sendEmail(email, 'Payment Details - GCash', emailBody);
          console.log('Email sent successfully to', email, 'for GCash payment.');
      })
      .catch((error) => alert(`Error: ${error.message}`));
}

// Function to send Bank payment email
function bankButtonEmail() {
  fetch('https://travellershubtravelandtours.com/api/auth/session-data-client')
      .then((response) => {
          if (response.ok) return response.json();
          throw new Error('Unable to fetch session data.');
      })
      .then((sessionData) => {
          const { firstName, email } = sessionData;

          const emailBody = `
              Hello ${firstName},<br><br>
              Thank you for booking an appointment with us. Please proceed to the payment using Bank.<br><br>
              <strong>Payment Details:</strong><br>
              <ul>
                  <li><strong>Bank Account:</strong> John Doe</li>
                  <li><strong>Reservation fee:</strong> 5,000</li>
                  <li><strong>Number:</strong> 09123456789</li>
              </ul>
              <strong>Scan the QR code to pay:</strong><br>
              <img src="https://i.imgur.com/bdCWUDS.png" alt="QR Code" style="width: 150px; height: auto;">  
          `;

          sendEmail(email, 'Payment Details - Bank', emailBody);
          console.log('Email sent successfully to', email, 'for Bank payment.');

      })
      .catch((error) => alert(`Error: ${error.message}`));
}

// Helper function to send email
function sendEmail(to, subject, body) {
  fetch('https://travellershubtravelandtours.com/api/auth/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body }),
  })
      .then((res) => {
          if (res.ok) {
              alert('Payment instructions have been sent to your email!');
          } else {
              throw new Error('Failed to send email.');
          }
      })
      .catch((error) => alert(`Error: ${error.message}`));
}