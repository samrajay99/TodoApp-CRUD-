const moongoose = require('mongoose');

const taskSchema = new moongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskModel = moongoose.model('Task', taskSchema);
module.exports = TaskModel;