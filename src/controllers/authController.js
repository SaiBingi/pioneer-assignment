const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authUtils = require('../utils/authUtils');

exports.register = async (req, res) => {
    const { name, username, email, password, gender } = req.body;
  
    const allowedGenders = ['male', 'female', 'other'];
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({ error: 'Please select a valid gender' });
    }

    try {
      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await authUtils.hashPassword(password);
  
      // Create a new user document
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        gender
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Find the user by email or username in the database
    const user = await User.findOne({ $or: [{ email }, { username }] });

    // If the user doesn't exist, return an error

    console.log(user, email, password);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify the password
    const isPasswordValid = await authUtils.verifyPassword(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token with expiration set to 30 days
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d' // Token expires in 30 days
    });

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
    // Placeholder for any server-side logout logic, like token blacklisting
    // For now, we just inform the client that the logout was successful

    res.status(200).send({ message: "You've been logged out successfully." });
};

exports.protected = (req, res) => {
  // Access user information from decoded token payload

  const userId = req.userId;

  res.json({ message: `This is a protected endpoint with UserId ${userId}`});
};

exports.getData = async (req, res) => {
  try {
    // Fetch data from public API
    const response = await fetch('https://api.publicapis.org/entries');
    const data = await response.json();

    // Filtering based on query parameters
    const { category, limit } = req.query;
    let filteredData = data.entries;
    if (category) {
      filteredData = filteredData.filter(entry => entry.Category.toLowerCase() === category.toLowerCase());
    }
    if (limit) {
      filteredData = filteredData.slice(0, parseInt(limit)); // Convert limit to integer and slice data accordingly
    }

    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}