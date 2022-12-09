const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dbConnect = require("../src/database/connection");
const dbSeed = require('./seeders/roles');

// Connect Database
dbConnect();

// Seed the database
dbSeed()

// Routes
const userRoutes = require('../src/routes/userRoutes');
const authRoutes = require('../src/routes/authRoutes');
const PORT = 7000;

// Start new express app
const app = express();

/**
 *  Middlewares
 */

// Set up app to accept requests from any source. 
app.use(cors());

// Establishes different HTTP headers to secure the API.
app.use(helmet());

// Parse the body of the json request
app.use(bodyParser.json())

// To log HTTP requests in the console
app.use(morgan('dev'));

// User requests
app.use('/api/users', userRoutes);

// Auth requests
app.use('/api/auth', authRoutes);

// Listening for incoming requests
app.listen(PORT, () => console.log('listening on port ' + PORT))

