const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); 
const path = require('path');
const PackageContent = require('./models/PackageContent'); // Update path as needed
const authorizeRoles  = require('./routes/accessController');


//const multer = require('multer');

require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
    origin: 'https://travellershubtravelandtours.com/',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Session configuration
app.use(session({
    secret: 'yourSecretKey', // Use a secure secret key in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false  } // Set to true if using HTTPS
}));

/*---------------------- MongoDB Connection -----------------*/
mongoose.connect('mongodb+srv://TravellersHubTT:travelershubtravelandtours@databasecluster.9hbza.mongodb.net/THTTDb?retryWrites=true&w=majority&appName=DatabaseCluster', {
})
.then(() => console.log("Database Connected"))
.catch(err => console.error("Database connection error:", err));



/*------------------ Serve static files --------------------------- */
// Other imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');

const submitRequirements = require('./routes/submitRequirements'); // Adjust path as needed

app.use('/api/requirements', submitRequirements);

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

/* Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure your EJS files are in the 'views' folder
app.get('/touristvisa', (req, res) => {
    res.render('TouristVisa'); // Automatically looks for 'TouristVisa.ejs' in the views folder
});*/


// Serve static files (HTML, CSS, JS, etc.)
app.use( express.static(path.join(__dirname, 'Clientpage')));
app.use('/assets', express.static(path.join(__dirname, 'assets'))); 
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/*------------------ Client serve static files --------------------------- */

// Serve HOMEPAGE directory statically
app.use(express.static(path.join(__dirname, 'Homepage')));

app.use('/Clientpage', express.static(path.join(__dirname, 'Clientpage')));

// Serve static pages directly
app.get('/Homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'Homepage.html'));
});



app.get('/Clientpage', (req, res) => {
    res.sendFile(path.join(__dirname,'Clientpage', 'Clientpage.html'));
});

app.get('/Japan', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'Japan', 'Japan.html'));
});

app.get('/about_us', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'about_us', 'about_us.html'));
});

app.get('/help_support', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'help_support', 'help_support.html'));
});


// Root route to serve Homepage.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'Homepage.html'));
});

//Email Verification
app.get('/EmailVerify', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'Emailverification', 'EmailVerification.html'));
});

//Email Confirmation
app.get('/EmailConfirm', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'Emailverification', 'EmailConfirmed.html'));
});


//Login
//Email Confirmation
app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Homepage', 'User_SignIn', 'SignIn.html'));
});


// Ensure JWT secret is set
const jwtSecret = process.env.JWT_SECRET || 'defaultFallbackSecret';

if (!process.env.JWT_SECRET) {
    console.warn("Warning: JWT_SECRET is not set in the environment variables. Using a fallback secret.");
}


/* ------------------------- Admin serve static files --------------------------- */
// Serve static files
app.use( express.static(path.join(__dirname, 'Adminpage')));
app.use('/assets', express.static(path.join(__dirname, 'assets'))); 
app.use('/client_scripts', express.static(path.join(__dirname, 'client_scripts')));
app.use('/admin_scripts', express.static(path.join(__dirname, 'admin_scripts')));



// Configure express-session
app.use(session({
    secret: process.env.SESSION_SECRET || 'yoursecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set `true` if using HTTPS
}));


/*------------------ Admin Roles serve static files --------------------------- */
// Role-specific routes
app.get('/Dashboard', authorizeRoles('Super Admin', 'Admin/Manager', 'Staff'), (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'Dashboard.html'));
});

app.get('/ManageAdmin', authorizeRoles('Super Admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'ManageAdmin.html'));
});

app.get('/TestimonialsApproval', authorizeRoles('Super Admin', 'Admin/Manager', 'Staff'), (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'TestimonialsApproval.html'));
});

app.get('/VisaInformation', authorizeRoles('Super Admin', 'Admin/Manager', 'Staff'), (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'VisaInformation.html'));
});

app.get('/VisaInformationArchive', authorizeRoles('Super Admin', 'Admin/Manager', 'Staff'), (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'VisaInformationArchive.html'));
});

app.get('/PackageInformation', authorizeRoles('Super Admin', 'Admin/Manager', 'Staff'), (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'PackageInformation.html'));
});

app.get('/PackageInformationArchive', authorizeRoles('Super Admin', 'Admin/Manager', 'Staff'), (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'PackageInformationArchive.html'));
});

app.get('/ManageTourPackage', authorizeRoles('Super Admin', 'Admin/Manager'), (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'ManageTourPackage.html'));
});

//ACCESS DENIED PAGE

app.get('/AccessDenied', (req, res) => {
    res.sendFile(path.join(__dirname, 'Adminpage', 'AccessDenied.html'));
});

// ADMIN LOGIN PAGE SERVE
app.get('/Adminlogin', (req, res) => {
    res.sendFile(path.join(__dirname,  'Adminpage','AdminLogin.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));