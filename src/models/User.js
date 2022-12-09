const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

// Create user schema
const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    fistname: String,
    lastname: String,
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
    token: String,
    active: Boolean,
    dateCreated: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Encrypt user password
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare stored password with request password
userSchema.statics.comparePassword = async (requestPassword, dbPassword) => {
  return await bcrypt.compare(requestPassword, dbPassword);
};

const User = model("User", userSchema);

module.exports = User;
