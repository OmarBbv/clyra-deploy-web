const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Blog");
    console.log(`Database Connected Successfully: mongodb://localhost:27017/Blog`);
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
