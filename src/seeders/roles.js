const Role = require('../models/Role');

const seed = async () => {
    const currentRoles = await Role.find();

    if (currentRoles.length == 0) {
        Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save(),
        ]).then( (e) => {
            return;
        })
    }
}

module.exports = seed;