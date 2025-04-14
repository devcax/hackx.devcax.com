const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env file

const teamRoutes = require('./routes/teams');
const authRoutes = require('./routes/auth'); // Import auth routes
const Admin = require('./models/Admin'); // Import Admin model

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Database Connection
const dbURI = process.env.DB_URI;
if (!dbURI) {
  console.error("FATAL ERROR: DB_URI is not defined.");
  process.exit(1);
}

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    
    // Create default admin account if it doesn't exist
    // createDefaultAdmin();
  })
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

// Function to create default admin account
// async function createDefaultAdmin() {
//   try {
//     // Check if admin already exists
//     const adminExists = await Admin.findOne({ username: 'admin' });
    
//     if (!adminExists) {
//       const admin = new Admin({
//         username: 'admin',
//         password: '123123'  // This will be hashed by the pre-save hook in the Admin model
//       });
      
//       await admin.save();
//       console.log('Default admin account created: username = admin, password = 123123');
//     } else {
//       console.log('Admin account already exists');
//     }
//   } catch (error) {
//     console.error('Error creating default admin account:', error);
//   }
// }

// Routes
app.use('/api/teams', teamRoutes);
app.use('/api/auth', authRoutes); // Use auth routes

// Simple route for base URL
app.get('/', (req, res) => {
  res.send('HackX Backend API is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
