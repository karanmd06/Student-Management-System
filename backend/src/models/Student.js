const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, unique: true, sparse: true },
  class: { type: String },
  rollNo: { type: String, unique: true, sparse: true },
  grades: [{ subject: String, score: Number }],
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', StudentSchema);

// Migration function to drop old rollNumber index
Student.migrateIndexes = async function() {
  try {
    const indexes = await this.collection.getIndexes();
    if (indexes.rollNumber_1) {
      console.log('Migrating: Dropping old rollNumber_1 index...');
      await this.collection.dropIndex('rollNumber_1');
      console.log('✓ Old index dropped successfully');
    }
  } catch (error) {
    // Ignore if index doesn't exist or collection doesn't exist yet
    if (error.code !== 27) { // 27 = IndexNotFound
      console.log('Note: Could not drop old index:', error.message);
    }
  }
};

module.exports = Student;