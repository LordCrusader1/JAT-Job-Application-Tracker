import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Import AuthContext
import '../styles/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router hook for navigation
  const { login } = useContext(AuthContext); // Access login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = response.data; // Extract token and user object from the response
      setMessage('Login successful!');
      console.log('Token:', response.data.token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      login(user, token); // Update AuthContext

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Update the AuthContext with the token
      login({ email }, response.data.token);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='login-container'>
      <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      {message && <p>{message}</p>}
      
      <p>
        Don't have an account?{' '}
        <button onClick={() => navigate('/register')} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
          Register Here
        </button>
      </p>
      </form>
    </div>
  );
};

export default Login;

