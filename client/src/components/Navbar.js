import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { auth, logout } = useContext(AuthContext);  // Get auth context
  const navigate = useNavigate();  // For navigation after logout

  const handleLogout = () => {
    logout();  // Clear auth context and local storage
    navigate('/login');  // Redirect to login page
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navLinks}>
        {/* Show 'Login' if not authenticated, 'Logout' if authenticated */}
        {!auth.token ? (
          <li onClick={() => navigate('/login')} style={styles.navItem}>Login</li>
        ) : (
          <>
            <li onClick={() => navigate('/dashboard')} style={styles.navItem}>Dashboard</li>
            <li onClick={handleLogout} style={styles.navItem}>Logout</li>
          </>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  navLinks: {
    display: 'flex',
    listStyleType: 'none',
  },
  navItem: {
    marginRight: '20px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '16px',
  }
};

export default Navbar;
