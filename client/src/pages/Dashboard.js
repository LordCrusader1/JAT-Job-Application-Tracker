import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import { fetchDashboard } from '../utils/api'; // Adjust path based on your folder structure
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css'

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [dashboardData, setDashboardData] = useState(null); // For protected dashboard data
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);
  
  console.log('Auth in Dashboard:', auth); // Debug auth state

  // Fetch jobs (existing logic)
  const fetchJobs = async () => {
    try {
      const userId = req.user.id; // Extract the logged-in user's ID
      const jobs = await jobs.find({ userId }); // Fetch only this user's jobs
      const response = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Fetched jobs:', response.data);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs.');
    }
  };

  // Fetch protected dashboard data
  const loadDashboardData = async () => {
    try {
      const data = await fetchDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data.');
    }
  };
  

  const handleEdit = (job) => {
    setJobToEdit(job);
  };

  const clearEdit = () => {
    setJobToEdit(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Load jobs and protected dashboard data on component mount
  useEffect(() => {
    fetchJobs();
    loadDashboardData(); // Load the protected data
    console.log('Jobs state:', jobs); // Debugging log
  }, []);

  return (
    <div className='dashboard-container'>
      <div>
        <h1>Job Application Tracker</h1>
        <h2>Welcome To Your Dashboard, {auth.user?.name || 'User'}!</h2>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
  
        {jobs.length === 0 && <p>No job applications found.</p>}
        <JobList jobs={jobs} handleEdit={handleEdit} handleDelete={handleDelete} />
        <JobForm fetchJobs={fetchJobs} jobToEdit={jobToEdit} clearEdit={clearEdit} />
      </div>
    </div>
  );
};

export default Dashboard;

