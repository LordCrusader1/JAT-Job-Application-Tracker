const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same JWT secret as in login
    req.user = decoded; // Add the decoded user info to the request object
    next(); // Allow the request to continue to the next middleware/route
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(400).json({ message: 'Invalid token.' });
  }
};



module.exports = verifyToken;
