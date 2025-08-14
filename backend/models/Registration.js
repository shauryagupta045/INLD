const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18'],
    max: [100, 'Age must be less than 100']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  constituency: {
    type: String,
    required: [true, 'Constituency is required'],
    trim: true
  },
  profession: {
    type: String,
    trim: true
  },
  skills: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Ground Operations', 'Party Membership', 'Support & Advocacy', 'Youth Initiatives'],
    default: 'Ground Operations'
  },
  agreeTerms: {
    type: Boolean,
    required: [true, 'You must agree to terms and conditions']
  },
  receiveUpdates: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    default: 'website'
  }
}, {
  timestamps: true
});

// Create index for email to ensure uniqueness
registrationSchema.index({ email: 1 });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
