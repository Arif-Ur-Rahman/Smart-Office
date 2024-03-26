const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      enum: ['NEW', 'BACKLOG', 'READY', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
    },

    start_date: {
      type: Date
    },

    end_date: {
      type: Date
    },

  },
  { timestamps: true }
);
module.exports = mongoose.model('personal_task', TaskSchema);