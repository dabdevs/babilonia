const User = require("../models/User");

const validators = {};

validators.userExists = async (email) => {
  return await User.findOne({ email }, { password: 0 });
};

module.exports = validators;
