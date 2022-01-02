// imports
const express = require('express');
const createLink = require('./routes/createLink');

// Creating a Router
const router = express.Router();

// Creating Routes
router.route('/create/').post(createLink);

module.exports = router;