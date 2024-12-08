const GroupTour = require("../models/groupTour");
const multer = require('multer');

// Multer configuration for dynamic file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

exports.upload = multer({
    storage,
}).any(); // Accept any file field

// Handle booking submission
exports.createBooking = async (req, res) => {
    try {
        // Fetch session data for leadName, email, and packageName
        const client = req.session?.client;
        const packageName = req.session?.packageName;

        if (!client || !packageName) {
            return res.status(400).json({ message: 'Session data missing for leadName or packageName' });
        }

        // Generate leadName from client session data
        const leadName = `${client.firstName} ${client.middleName || ''} ${client.lastName}`.trim();
        const email = client.email;

        // Destructure form data
        const {
            additionalTravellers,
            adultNumber,
            childNumber,
            infantNumber,
            ...primaryInfo
        } = req.body;

        const additionalTravellersData = JSON.parse(additionalTravellers || '[]');

        // Helper function to find files by dynamic name
        const findFile = (name) =>
            req.files.find((file) => file.fieldname === name) || null;

        // Map uploaded files to their respective fields
        const mapFile = (file) =>
            file && {
                filename: file.filename,
                path: file.path,
                mimetype: file.mimetype,
                size: file.size,
            };

        // Create the booking record
        const booking = new GroupTour({
            ...primaryInfo,
            leadName, // Retrieved from session
            packageName, // Retrieved from session
            email, // Retrieved from session
            adult: Number(adultNumber), // Save as number
            child: Number(childNumber), // Save as number
            infant: Number(infantNumber), // Save as number
            passportID: mapFile(findFile('passport')),
            visaID: mapFile(findFile('visa')),
            validID: mapFile(findFile('validId')),
            birthCertificate: mapFile(findFile('birthCertificate')),
            picture: mapFile(findFile('picture')),
            paymentReciept: mapFile(findFile('paymentReciept')),
            additionalTravellers: additionalTravellersData.map((traveller, index) => ({
                name: index === 0 ? traveller.name : traveller[`name_${index + 1}`],
                passportID: mapFile(findFile(index === 0 ? 'addpassport' : `addpassport_${index + 1}`)),
                visaID: mapFile(findFile(index === 0 ? 'addvisa' : `addvisa_${index + 1}`)),
                validID: mapFile(findFile(index === 0 ? 'addvalidId' : `addvalidId_${index + 1}`)),
                birthCertificate: mapFile(findFile(index === 0 ? 'addbirthCertificate' : `addbirthCertificate_${index + 1}`)),
                picture: mapFile(findFile(index === 0 ? 'addpicture' : `addpicture_${index + 1}`)),
            })),
        });

        await booking.save();
        res.status(201).json({ message: 'Booking successfully submitted!' });
        console.log('Booking successfully submitted: ', booking);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting booking', error });
    }
};