const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dbConnect = require("./src/database/connection");
const { seed } = require("./src/seeders/roles");
const passport = require('passport')
const path = require('path')
require("./src/google-auth")
const { isLoggedIn } = require("./src/utils/helpers")
// Configuration to access the environment variables
require("dotenv").config();

// Routes
const users = require("./src/routes/users");
const auth = require("./src/routes/auth");
const listings = require("./src/routes/listings");
const PORT = 7000;

// Start new express app
const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }))
app.use(passport.initialize())
app.use(passport.session())

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public')));

/**
 *  Middlewares
 */

// Set up app to accept requests from any source.
app.use(cors());

// Establishes different HTTP headers to secure the API.
app.use(helmet());

// Parse the body of the json request
app.use(bodyParser.urlencoded({
    extended: true
}));

// To log HTTP requests in the console
app.use(morgan("dev"));

// Index
app.get("/", (req, res) => {
    res.send('<a href="api/auth/google">Authenticate with Google</a>')
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname +'/public/login.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname +'/public/register.html') 
})

// secure routes 
app.get('/api/secure', isLoggedIn, (req, res) => {
    res.send('Secured!')
})

// User requests
app.use("/api/users", users);

// Auth requests
app.use("/api/auth", auth);

// Listing requests
app.use("/api/listings", listings);

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


