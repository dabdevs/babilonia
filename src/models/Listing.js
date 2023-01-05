const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Create listing schema
const listingSchema = new Schema(
  {
    title: String,
    description: String,
    superficy: Number,
    price: Number,
    city: String,
    address: String,
    buildDate: Date,
    author: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
    active: Boolean,
    dateCreated: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
listingSchema.statics.comparePassword = async (requestPassword, dbPassword) => {
  return await bcrypt.compare(requestPassword, dbPassword);
};

*/

const listing = model("listing", listingSchema);

module.exports = listing;
