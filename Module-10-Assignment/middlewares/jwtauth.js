const jwt = require('jsonwebtoken');



const  generateToken = (req, res) => {
    const userId = req.body.userID; // Replace with the actual user ID
    const secretKey = req.body.Key; // Replace with your own secret key
    const payload = { userId };
    const token = jwt.sign(payload, secretKey);
    return token;
}

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'your_secret_key');

    // Attach the user ID to the request for future use
    req.userId = decoded.userId;

    // Call the next middleware function
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { generateToken, authenticate };
