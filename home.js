const express = require('express');
const router = express.Router();

// Define your routes for the home page
router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

module.exports = router; 
