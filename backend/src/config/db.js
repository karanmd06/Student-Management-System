const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Run migrations after connection
    try {
      const Student = require('../models/Student');
      await Student.migrateIndexes();
    } catch (migrationError) {
      console.log('Migration note:', migrationError.message);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

