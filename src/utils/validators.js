const User = require("../models/User");
const Listing = require("../models/Listing");

const validators = {};

validators.exists = async (model, field) => {
  switch (model) {
    case 'User':
      return await User.findOne({ field }, { password: 0 });
      break;
    case 'Listing':
      return await Listing.findOne({ field });
      break;
    default:
      break;
  }
};

module.exports = validators;
