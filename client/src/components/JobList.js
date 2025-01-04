import React from 'react';

const JobList = ({ jobs, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Job Applications</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <strong>{job.companyName}</strong> - {job.role} - {job.status}
            <button onClick={() => handleEdit(job)}>Edit</button>
            <button onClick={() => handleDelete(job._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
