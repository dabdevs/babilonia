const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validators = require("../utils/validators");
const { assignRoles } = require("../utils/helpers");

let controller = {};

/**
 *  Register a new user
 */
controller.register = async (req, res) => {

  const { email, password, roles } = req.body;

  try {
    // Validate if user exists
    const user = await User.findOne({ email }, { password: 0 })
    if (user) return res.send({ message: "User already exists." });

    // Create new user object
    let newUser = new User({
      email,
      password: await User.encryptPassword(password)
    });

    // Asign roles to user
    if (roles)
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
 *  Log a user in
 */
controller.login = async (req, res) => {
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

/**
 *  Log a user out
 */
controller.logout = (req, res) => {
  try {
    req.logout(function(err) {  
      if (err) { return next(err); }
      return res.redirect('/login');
    });
  } catch (error) {
    console.log(error)
  }
}


module.exports = controller;
