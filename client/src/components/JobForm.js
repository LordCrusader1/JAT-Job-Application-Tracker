import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs')
      .then((response) => setJobs(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Job Applications</h1>
      {jobs.length > 0 ? (
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <strong>{job.companyName}</strong> - {job.role} ({job.status})
          </li>
        ))}
      </ul>
    ) : (
      <p>No job applications found.</p>
    )}
    </div>
  );
};

const JobForm = ({ fetchJobs, jobToEdit, clearEdit }) => {
  const [jobData, setJobData] = useState({
    companyName: jobToEdit?.companyName || '',
    role: jobToEdit?.role || '',
    status: jobToEdit?.status || 'applied',
    applicationDate: jobToEdit?.applicationDate || '',
    notes: jobToEdit?.notes || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (jobToEdit) {
        // Update existing job
        await axios.put(`http://localhost:5000/api/jobs`, jobData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        clearEdit();
      } else {
        // Add new job
        await axios.post('http://localhost:5000/api/jobs', jobData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      // Refresh jobs list
      fetchJobs();
      // Reset form fields
      setJobData({
        companyName: '',
        role: '',
        status: 'applied',
        applicationDate: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="companyName" placeholder="Company Name" value={jobData.companyName} onChange={handleChange} required />
      <input type="text" name="role" placeholder="Role" value={jobData.role} onChange={handleChange} required />
      <select name="status" value={jobData.status} onChange={handleChange}>
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="offered">Offered</option>
        <option value="rejected">Rejected</option>
      </select>
      <input type="date" name="applicationDate" value={jobData.applicationDate} onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" value={jobData.notes} onChange={handleChange}></textarea>
      <button type="submit">{jobToEdit ? 'Update Job' : 'Add Job'}</button>
    </form>
  );
};

// Export components as named exports
export { Dashboard, JobForm as default};


