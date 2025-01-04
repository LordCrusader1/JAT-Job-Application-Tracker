import axios from 'axios';

// Function to fetch protected dashboard data
export const fetchDashboard = async () => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  if (!token) {
    console.error('No token found! Redirecting to login...');
    return;
  }

  try {
    // Make a GET request to the protected route with the token
    const response = await axios.get('http://localhost:5000/api/jobs/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    console.log('Dashboard data:', response.data); // Handle the successful response
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error fetching dashboard data:', error.response?.data || error.message);

    // Handle 401 Unauthorized (invalid/expired token)
    if (error.response && error.response.status === 401) {
      console.log('Redirecting to login...');
    }

    throw error; // Re-throw error for further handling if needed
  }
};

