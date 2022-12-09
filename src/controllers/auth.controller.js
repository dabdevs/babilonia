const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validators = require("../utils/validators");
const { assignRoles } = require("../utils/helpers");

let authController = {};

/**
 *  Create a new user in the DB
 */
authController.signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    // Validate if user exists
    const userExists = await validators.userExists(email);
    if (userExists) return res.send({ message: "User already exists." });

    // Create new user object
    let newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password)
    });

    // Asign roles to user
    newUser = await assignRoles(newUser, roles);

    // Save new user to DB
    await newUser.save();

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: 3600,
    });

    // Return token to user
    return res.status(201).json({
      status: "OK",
      message: "User signed up successfully.",
      token: token,
      user: newUser,
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 *  Sign a user in
 */
authController.signin = async (req, res) => {
  try {
    // Get the user to sign in
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    // User is not found
    if (!user) return res.status(400).json({ message: "User not found." });

    // Compare passwords
    const passwordsMatch = await User.comparePassword(
      req.body.password,
      user.password
    );

    // If passwords do not match
    if (!passwordsMatch)
      return res.status(401).json({ message: "Invalid password", token: null });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: 3600,
    });

    // Return token to user
    return res.json(token);
  } catch (err) {
    console.log(err);
  }
};

module.exports = authController;
