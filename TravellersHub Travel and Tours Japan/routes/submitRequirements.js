const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Requirements = require('../models/Requirements');

const router = express.Router();

/* Configure Multer to store files on disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads/');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// File fields to accept
const fileFields = [
    { name: 'passportFile', maxCount: 1 },
    { name: 'visaApplicationFile', maxCount: 1 },
    { name: 'photoFile', maxCount: 1 },
    { name: 'birthCertificateFile', maxCount: 1 },
    { name: 'marriageCertificateFile', maxCount: 1 }, // Optional
    { name: 'itineraryJapan', maxCount: 1 },
    { name: 'personalBankCertificateFile', maxCount: 1 },
    { name: 'taxPaymentCertificateFile', maxCount: 1 },
    { name: 'employmentCertificateFile', maxCount: 1 },
];

// Handle form submission and save files
// Endpoint to handle form submission
router.post('/submit-requirements', upload.fields(fileFields), async (req, res) => {
    try {
        // Ensure user is logged in
        if (!req.session || !req.session.client) {
            return res.status(401).json({
                success: false,
                message: 'You are not logged in. Please log in first.',
            });
        }

        // Extract name and email from session
        const { firstName, middleName, lastName, email } = req.session.client;
        const name = `${firstName} ${middleName || ''} ${lastName}`.trim();

        // Check if user already submitted
        const existingSubmission = await Requirements.findOne({ name, email });
        if (existingSubmission) {
            return res.status(400).json({
                success: false,
                message: 'You have already submitted your requirements. Only one submission is allowed.',
            });
        }

        // Extract file paths and metadata
        const getFileDetails = (fieldName) => {
            if (req.files && req.files[fieldName] && req.files[fieldName][0]) {
                const file = req.files[fieldName][0];
                return {
                    filename: file.originalname,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                };
            }
            return null;
        };

        const requiredFiles = [
            'passportFile',
            'visaApplicationFile',
            'photoFile',
            'birthCertificateFile',
            'itineraryJapan',
            'personalBankCertificateFile',
            'taxPaymentCertificateFile',
            'employmentCertificateFile',
        ];

        // Validate required files
        for (const field of requiredFiles) {
            if (!getFileDetails(field)) {
                return res.status(400).json({
                    success: false,
                    message: `Missing file for ${field}. Please upload all required files.`,
                });
            }
        }

        // Optional field for marriage certificate
        const marriageCertificateFile = getFileDetails('marriageCertificateFile');

        // Create new Requirements document
        const newRequirements = new Requirements({
            name,
            email,
            passportFile: getFileDetails('passportFile'),
            visaApplicationFile: getFileDetails('visaApplicationFile'),
            photoFile: getFileDetails('photoFile'),
            birthCertificateFile: getFileDetails('birthCertificateFile'),
            marriageCertificateFile,
            itineraryJapan: getFileDetails('itineraryJapan'),
            personalBankCertificateFile: getFileDetails('personalBankCertificateFile'),
            taxPaymentCertificateFile: getFileDetails('taxPaymentCertificateFile'),
            employmentCertificateFile: getFileDetails('employmentCertificateFile'),
        });

        await newRequirements.save();

        // Respond with success status
        return res.json({
            success: true,
            message: 'Requirements submitted successfully!',
        });
    } catch (error) {
        console.error('Error submitting requirements:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while saving requirements. Please try again later.',
        });
    }
});

module.exports = router;
