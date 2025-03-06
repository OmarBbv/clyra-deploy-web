const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://omar:omar123@cluster0.oysdg.mongodb.net/clyra?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.error('Database Connection Error:', error);
    process.exit(1);
  }
};

module.exports = dbConnect;
