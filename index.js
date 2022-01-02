// Written by Shivam Singh

// imports
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const home = require('./routes/home');
const createLink = require('./routes/createLink');

// Configuring Dotenv
dotenv.config({ path: './.env' });

// Creating an Express App
const app = express();

// Getting the Environment Port
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json())

// Routing
app.get('/', home);
app.get('/api/create/', createLink);


// Logging Port Info
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
});