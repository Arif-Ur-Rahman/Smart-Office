const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    required: true,
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
  },

  role: {
    type: String,
    enum: ['Manager', 'Tech Manager', 'General Manager', 'Leader', 'Sub Leader',  'Trainer', 'Software Engineer', 'Trainee'],
    required: true,
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    required: true,
  },
}, { timestamps: true });
module.exports = mongoose.model('member', MemberSchema);
