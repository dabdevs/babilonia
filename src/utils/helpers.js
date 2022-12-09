const User = require("../models/User");
const Role = require("../models/Role");
const helpers = {};

helpers.assignRoles = async (user, roles = false) => {
  if (!roles) {
    // Asigning user role to user as default
    const userRole = Role.findOne({ name: "user" });
    user.roles = userRole._id;
  } else {
    // Asign received roles to the user
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => role._id);
  }

  return user;
};

module.exports = helpers;
