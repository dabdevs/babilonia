const mongoose = require("mongoose");
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_SECRET = process.env.MONGO_DB_SECRET;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_DB_URI = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_SECRET}@cluster0.ascilwc.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB connected successFully`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnect;
