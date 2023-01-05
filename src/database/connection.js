const mongoose = require("mongoose");

// Configuration to access the environment variables
require("dotenv").config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_SECRET = process.env.MONGODB_SECRET;
const MONGODB_NAME = process.env.MONGODB_NAME;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_SECRET}@${MONGODB_CLUSTER}/${MONGODB_NAME}?retryWrites=true&w=majority`;

const dbConnect = async () => {
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = dbConnect;
