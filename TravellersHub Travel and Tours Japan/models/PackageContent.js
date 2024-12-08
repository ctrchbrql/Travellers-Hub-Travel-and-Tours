const mongoose = require('mongoose');

const PackageContentSchema = new mongoose.Schema({
  packageId: {
    type: String,
    required: true,
    unique: true, // Ensures only one document per packageId
  },
  packageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tourHighlights: {
    type: String,
    required: true,
  },
  inclusionExclusion: {
    type: String,
    required: true,
  },
  itinerary: {
    type: String,
    required: true,
    trim: true,
  },
  reminders: {
    type: String,
    required: true,
  },
  coverImage: {
    filename: { type: String },
        path: { type: String }, 
    mimetype: { type: String },
        size: { type: Number },
  },  
  flyer: {
     filename: { type: String },
         path: { type: String }, 
     mimetype: { type: String },
         size: { type: Number },
  },
});

const PackageContent = mongoose.model('PackageContent', PackageContentSchema, 'PackageContent');

module.exports = PackageContent;