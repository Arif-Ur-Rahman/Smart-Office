const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    unique:false,
    required: true,
  },  
  email: {
    type: String,
    unique: false,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  active_status: {
    type: Boolean,
    required: true,
  },

},
    { timestamps: true },);
module.exports = mongoose.model('token', ModuleSchema);
  