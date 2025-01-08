const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true, enum: ['applied', 'interviewing', 'offered', 'rejected'], default: 'applied' },
  applicationDate: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  notes: String,
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
