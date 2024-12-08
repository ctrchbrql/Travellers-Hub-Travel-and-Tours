const mongoose = require('mongoose');

const additionalTravellerSchema = new mongoose.Schema({
    name: { type: String},
    
    passportID: { 
        filename: { type: String },
        path:     { type: String }, 
        mimetype: { type: String },
        size:     { type: Number },
    },
   
    visaID: { 
        filename: { type: String },
        path:     { type: String }, 
        mimetype: { type: String },
        size:     { type: Number },
    },
    
    validID: { 
        filename: { type: String },
        path:     { type: String }, 
        mimetype: { type: String },
        size:     { type: Number },
    },

    birthCertificate: { 
        filename: { type: String },
        path:     { type: String }, 
        mimetype: { type: String },
        size:     { type: Number },
    },
   
    picture: { 
        filename: { type: String },
        path:     { type: String }, 
        mimetype: { type: String },
        size:     { type: Number },
    },
});

const groupTourSchema = new mongoose.Schema({
    packageName: { type: String},
    leadName: { type: String},
    contactNumber: { type: String},
    email : { type: String},
    groupTourName: { type: String},
    dateFrom: { type: Date},
    dateTo: { type: Date},
    inquiryMessage: { type: String },
    adult: { type: Number},
    child: { type: Number },
    infant: { type: Number},

    passportID: {
        filename: { type: String },
        path:     { type: String },
        mimetype: { type: String },
        size:     { type: Number },
    },
    visaID: { 
        filename: { type: String },
        path:     { type: String },
        mimetype: { type: String },
        size:     { type: Number },
    },
    validID: { 
        filename: { type: String },
        path:     { type: String }, 
        mimetype: { type: String },
        size:     { type: Number },
    },
    birthCertificate: { 
        filename: { type: String },
        path:     { type: String },
        mimetype: { type: String },
        size:     { type: Number },
    },
    picture: { 
        filename: { type: String },
        path:     { type: String },
        mimetype: { type: String },
        size:     { type: Number },
    },
    paymentReciept: {
        filename: { type: String },
        path:     { type: String },
        mimetype: { type: String },
        size:     { type: Number },
     },

    status: { type: String, 
         enum: ['Accepted', 'Declined', 'Archived' , 'Pending'], 
         default: 'Pending' },
    additionalTravellers: [additionalTravellerSchema],
});

module.exports = mongoose.model('GroupTour', groupTourSchema,'GroupTour');
