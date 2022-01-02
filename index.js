// Written by Shivam Singh

// imports
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./router');
const { redirects } = require('./redirect');

// Configuring Dotenv
dotenv.config({ path: './.env' });

// Creating an Express App
const app = express();

// Getting the Environment Port
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json())
app.use(express.json())

// Routing
app.use('/api', router);
app.use('/', redirects);


// Logging Port Info
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
});