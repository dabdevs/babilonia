const dbConnect = require("../database/connection");
const User = require("../models/User");
const Role = require("../models/Role");

dbConnect();

let userController = {};

userController.createUser = async (req, res) => {
  // Extracting the values from request
  const { username, email, password, roles } = req.body;

    try {
        // Create new user Object
        const user = User({ username, email, password });

        // If there is no incoming roles in the request
        if (!roles) {
            // Asigning user role to user as default
            user.roles.push('user');
        } else {
            // Asign received roles to the user
            const foundRoles = await Role.find({name: {$in: roles}});
            user.roles = foundRoles.map(role => role._id);
        }

        // Save the user in the database
        user.save(function (err) {
            if (err) {
            console.log(err);
            return res
                .status(500)
                .json({ message: "There was an error creating the user." });
            }
        });

        // Return response
        return res
            .status(201)
            .json({ message: "User created successfully.", "status": "OK", user: user });
    } catch (err) {
        console.log(err)
    }
};

userController.getUsers = async (req, res) => {
    try {
        // Getting all users from DB
        const users = await User.find()

        // Returning the users
        return res.json({"status": "OK", "users": users});
    } catch (err) {
        console.log(err)
    }
};

userController.getUser = async (req, res) => {
    try {
        // Get user from DB
        const user = await User.findById(req.params.id) 

        // Returning the user
        return res.json({"status": "OK", "user": user});
    } catch (err) {
        console.log(err)
    }
};

userController.updateUser = async (req, res) => {
    try {
        // Update user 
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}); 

        return res.json({"status": "OK", "user": user});
    } catch (err) {
        console.log(err)
    }
};

userController.deleteUser = async (req, res) => {
    try {
        // Delete user from DB
        await User.findByIdAndDelete(req.params.id, req.body); 

        return res.json({"status": "OK", "message": "User deleted successfully."});
    } catch (err) {
        console.log(err)
    }
};

module.exports = userController;
