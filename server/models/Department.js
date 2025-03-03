const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  head: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Department', departmentSchema); 