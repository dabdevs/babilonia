const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dbConnect = require("./src/database/connection");
const { seed } = require("./src/seeders/roles");

// Routes
const users = require("./src/routes/users");
const auth = require("./src/routes/auth");
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
app.use(bodyParser.json());

// To log HTTP requests in the console
app.use(morgan("dev"));

// User requests
app.use("/api/users", users);

// Auth requests
app.use("/api/auth", auth);

const start = async () => {
    try {
        // Connect Database
        await dbConnect();
        console.log('Connected to database')
  
        // Seed the database
        await seed();
        console.log('Database seeded')

        // Listening for incoming requests
        app.listen(PORT, () => console.log("listening on port " + PORT));
    } catch (err) {
        console.log(err)
    }
}

start();


