const User = require('../models/User');

const validators = {}

validators.userExists = async (email) => {
    return await User.findOne({email});
}

module.exports = validators