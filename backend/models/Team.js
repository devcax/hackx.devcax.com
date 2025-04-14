const mongoose = require('mongoose');

// Define the schema for team members
const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team member name is required']
  },
  email: {
    type: String,
    required: [true, 'Team member email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  }
});

// Define the schema for teams
const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true
  },
  captain: {
    name: {
      type: String,
      required: [true, 'Team captain name is required']
    },
    email: {
      type: String,
      required: [true, 'Team captain email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Team captain phone is required']
    }
  },
  members: [teamMemberSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', teamSchema);
