const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().select('teamName captain.name captain.email captain.phone createdAt members.name members.email members.phone');
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error: error.message });
  }
});

// GET a specific team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team', error: error.message });
  }
});

// POST create a new team
router.post('/', async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(400).json({ message: 'Error creating team', error: error.message });
  }
});

// DELETE a team
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team', error: error.message });
  }
});

module.exports = router;
