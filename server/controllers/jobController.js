const Job = require('../models/Job'); // Make sure this path matches your project structure

// Create a new job
export.createJob = async (req, res) => {
  try {
    const { companyName, role, status } = req.body;
    const userId = req.user.id; // Assuming you're using authentication middleware

    const newJob = new Job({
      companyName,
      role,
      status,
      user: userId, // Associate job with the user
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all jobs for the logged-in user
exports.getJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await Job.find({ user: userId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add more methods (updateJob, deleteJob) as needed
