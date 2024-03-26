const mongoose = require('mongoose');
//

const employeeSchema = new mongoose.Schema(
  {
    employee_id_no: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    contact_number: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    is_admin: {
      type: Boolean,
      required: true,
    },

    active_status: {
      type: Boolean,
      required: true,
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },

    joining_date: {
      type: Date,
      required: true,
    },

    imageURL: {
      type: String,
    },

    designation: {
      type: String,
    },

    department_name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('employee', employeeSchema);
