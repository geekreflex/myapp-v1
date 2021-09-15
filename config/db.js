const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_LOCAL, {});

    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error('Unable to connect ', err);
  }
};

module.exports = connectDB;
