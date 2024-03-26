const { date, string } = require('joi');
const { Timestamp, Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const Tasks = require('./task.model')

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  version_number: {
    type: String,
    required: true,
  },

  git_link: {
    type: String,
    required: false,
  },

  start_date: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  end_date: {
    type: Date,
    required: true,
    default: () => Date.now() + 30 * 24 * 60 * 60 * 1000,
  },

  progress_percentage: {
    type: Decimal128,
    required: true
  },

  technologies:{
    type: [String]
  },

  
  status: {
    type: String,
    enum: ['Running', 'Cancel', 'On-Hold', 'Complete']
  },

  priority: {
    type: String,
    enum: ['High', 'Low', 'Medium']
  },

  member: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'member'
  }],
  active_status:{
    type: Boolean,
    default: true,
  },

  employee : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee'
  }

  // task: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'task'
  // }
  // current_status: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'status',
  //   required: true,
  // },

  // start_date: {
  //   type: Date,
  //   required: true
  // },

  // end_date: {
  //   type: Date,
  //   required: true
  // },


  // assign_members: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'member',
  //   required: false,
  // },
  // states: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'state',
  //   required: false,
  // },






  // priority: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'priority',
  //   required: true,
  // },

  // technologies: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'technology',
  //   required: true,
  // },

  // members:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Members"
  // } ,
  // tasks:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "task"
  // } ,

  // active_status: {
  //   type: Boolean,
  //   required: true,
  // },
}, { Timestamp: true });

module.exports = mongoose.model('project', ProjectSchema);