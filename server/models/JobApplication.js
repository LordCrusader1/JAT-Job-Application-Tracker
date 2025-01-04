const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  companyName: String,
  role: String,
  status: { type: String, enum: ['applied', 'interviewing', 'offered', 'rejected'], default: 'applied' },
  applicationDate: { type: Date, default: Date.now },
  notes: String,
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
