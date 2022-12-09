const { Schema, model } = require("mongoose");

// Create role schema
const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Role", roleSchema);
