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

    assigned_to: [{
      type: mongoose.Schema.Types.ObjectId,
      // type: mongoose.Schema.ObjectId,
      ref: 'member',
      required: true,
    }],
    
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
      required: true,
    },

    state: {
      type: String,
      enum: ['NEW', 'BACKLOG', 'READY', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],

    },

    time_of_update_state: {
      type: Date
    },

    updated_by_this_state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee'
    },

    // difficulty_level: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'difficulty_level',
    //   required: true,
    // },
    // start_time: {
    //   type: Date,
    //   required: true,
    //   default: () => Date.now(),
    // },
    // end_time: {
    //   type: Date,
    //   required: true,
    //   default: () => Date.now() + 30*24*60*60*1000,    
    // },

    start_date: {
      type: Date
    },

    end_date: {
      type: Date
    },

    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project"

    },

  },
  { timestamps: true }
);
module.exports = mongoose.model('task', TaskSchema);