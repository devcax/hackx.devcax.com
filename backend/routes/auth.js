const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// --- Environment Variable for JWT Secret ---
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1);
}

// --- Admin Login Route ---
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and sign JWT token
    const payload = {
      admin: {
        id: admin.id,
        username: admin.username,
      },
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).send('Server error');
  }
});

// --- Helper Route to Create First Admin (Optional - Run Once) ---
// REMOVE or secure this route after creating the first admin
router.post('/setup-admin', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin username already exists' });
    }

    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: 'Admin account created successfully' });

  } catch (err) {
    console.error('Setup Admin Error:', err.message);
    res.status(500).send('Server error during admin setup');
  }
});


module.exports = router; 