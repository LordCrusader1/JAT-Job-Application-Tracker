const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');
const verifyToken = require('../middleware/authMiddleware');
const jobController = require('../controllers/jobController'); // Adjust the path

// Assuming you have an authentication middleware
const authenticate = require('../middleware/authMiddleware');

router.post('/jobs', authenticate, jobController.createJob);
router.get('/jobs', authenticate, jobController.getJobs);

// Dashboard route (optional test)
router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Protected dashboard', user: req.user });
});

// Fetch all job applications for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const jobs = await JobApplication.find({ user: req.user.id }); // Fetch jobs for the logged-in user
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Add a new job application
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, company, description } = req.body;

    const job = new JobApplication({
      title,
      company,
      description,
      user: req.user.id, // Associate the job with the logged-in user
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add job' });
  }
});

// Update a job application by ID
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);

    if (!job || job.user.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Job not found or not authorized' });
    }

    const { title, company, description } = req.body;
    job.title = title || job.title;
    job.company = company || job.company;
    job.description = description || job.description;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update job' });
  }
});

// Delete a job application by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);

    if (!job || job.user.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Job not found or not authorized' });
    }

    await job.remove();
    res.json({ message: 'Job application deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

module.exports = router;
