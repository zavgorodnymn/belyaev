const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['lecture', 'practice', 'lab'],
    required: true
  },
  group: {
    type: String,
    required: true
  },
  semester: {
    year: {
      type: Number,
      required: true
    },
    term: {
      type: String,
      enum: ['Fall', 'Spring', 'Summer'],
      required: true
    }
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema); 