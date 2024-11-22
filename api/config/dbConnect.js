const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://omar:omar123@test.v8ulp.mongodb.net/'
    );
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.error('Database Connection Error:', error);
    process.exit(1);
  }
};

module.exports = dbConnect;
