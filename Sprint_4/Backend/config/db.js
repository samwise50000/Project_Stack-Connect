const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`Connected to database`);
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
