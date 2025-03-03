const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  schedule: [{
    day: String,
    time: String,
    room: String
  }],
  semester: {
    year: Number,
    term: { type: String, enum: ['Fall', 'Spring', 'Summer'] }
  }
});

module.exports = mongoose.model('Course', courseSchema); 