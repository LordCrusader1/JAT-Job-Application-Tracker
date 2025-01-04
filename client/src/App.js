import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';  // Import the Navbar component

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <div className="App">
        <Router>
        <Navbar />  {/* Place Navbar above the routes */}
          <Routes>
            {/* Public Route: Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Public Route: Register */}
            <Route path="/register" element={<Register />} />

            {/* Protected Route: Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Catch-All Route: Redirect to Login */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
