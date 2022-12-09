const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validators = require("../utils/validators");
const { assignRoles } = require("../utils/helpers");

let authController = {};

authController.signup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    // Creating new user
    // Validate user
    const userExists = await validators.userExists(email);

    if (userExists) return res.send({ message: "User already exists." });

    let newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    // Asigning roles to user
    newUser = await assignRoles(newUser, roles);

    await newUser.save();

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: 3600,
    });

    // Return token
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

authController.signin = async (req, res) => {
  try {
    // Get user
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!user) return res.status(400).json({ message: "User not found." });

    const passwordsMatch = await User.comparePassword(
      req.body.password,
      user.password
    );

    if (!passwordsMatch)
      return res.status(401).json({ message: "Invalid password", token: null });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: 3600,
    });
    return res.json(token);
  } catch (err) {
    console.log(err);
  }
};

module.exports = authController;
