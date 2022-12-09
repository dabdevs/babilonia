const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    fistname: String,
    lastname: String,
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    token: String,
    active: Boolean,
    dateCreated: Date 
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {}
userSchema.statics.comparePassword = async (dbPassword, requestPassword) => {}

const User = model('User', userSchema);

module.exports = User;