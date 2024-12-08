const mongoose = require('mongoose');

const RequirementsSchema = new mongoose.Schema({

    name: { type: String},

    email: { type: String},

    passportFile: {
        filename: { type: String },
        path: { type: String }, // Store file data
        mimetype: { type: String },
        size: { type: Number },
    },
    visaApplicationFile: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    },
    photoFile: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    },
    birthCertificateFile: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    },
    marriageCertificateFile: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    },
    itineraryJapan: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    },
    personalBankCertificateFile: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    },
    taxPaymentCertificateFile: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    },
    employmentCertificateFile: {
        filename: { type: String },
        path: { type: String },
        mimetype: { type: String },
        size: { type: Number },
    },
    status: { 
        type: String, enum: 
        ['Accepted', 'Declined', 'Archived' ,  'Pending'], 
        default: 'Pending' },

    submittedAt: {
        type: Date,
        default: Date.now,
    },
});


// Create the model
const Requirements = mongoose.model('Requirements', RequirementsSchema, 'Requirements');

module.exports = Requirements;