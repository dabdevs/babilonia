const User = require("../models/User");
const validators = require("../utils/validators");
const { assignRoles } = require("../utils/helpers");

let userController = {};

userController.createUser = async (req, res) => {
  // Extracting the values from request
  const { username, email, password, roles } = req.body;

  try {
    // Validate if user exists
    const userExists = await validators.userExists(email);
    if (userExists) return res.send({ message: "User already exists." });

    // Create new user Object
    let user = User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    // Asigning roles to user
    user = await assignRoles(user, roles);

    // Save the user in the database
    user.save(function (err) {
        // If there is an error
        if (err) {
            console.log(err);
            return res
            .status(500)
            .json({ message: "There was an error creating the user." });
        }
    });

    // Return response
    return res.status(201).json({
      message: "User created successfully.",
      status: "OK",
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

userController.getUsers = async (req, res) => {
  try {
    // Get all users from DB
    const users = await User.find();

    // Returning the users
    return res.json({ status: "OK", users: users });
  } catch (err) {
    console.log(err);
  }
};

userController.getUser = async (req, res) => {
  try {
    // Get user from DB
    const user = await User.findById(req.params.id);

    // Returning the user
    return res.json({ status: "OK", user: user });
  } catch (err) {
    console.log(err);
  }
};

userController.updateUser = async (req, res) => {
  try {
    // Update user
    const { password } = req.body;
    req.body.password = await User.encryptPassword(password);
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json({ status: "OK", user: user });
  } catch (err) {
    console.log(err);
  }
};

userController.deleteUser = async (req, res) => {
  try {
    // Delete user from DB
    await User.findByIdAndDelete(req.params.id);

    return res.json({ status: "OK", message: "User deleted successfully." });
  } catch (err) {
    console.log(err);
  }
};

module.exports = userController;
