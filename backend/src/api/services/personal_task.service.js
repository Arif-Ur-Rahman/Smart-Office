const PersonalTask = require('../models/personal_task.model');
const { findByIdAndUpdate, findByIdAndDelete } = require('../models/task.model');

const createPersonalTask = async(data, callback) => {
    try {
        const personal_task = new PersonalTask({
          title: data.title,
          description: data.description,
          state: "NEW",
          start_date: data.start_date,
          end_date: data.end_date,
        });
  
        const newPersonalTask = await personal_task.save();
  
        return callback(null, newPersonalTask);
      } catch (error) {
        return callback(error);
      }
}

const updatePersonalTask = async(data, callback) => {
    try {
        const updatePersonalTask = await PersonalTask.findByIdAndUpdate(data.id, {
            title: data.title,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date,
        }, { new: true });
        return callback(null, updatePersonalTask);
    } catch (error) {
        return callback(error)
    }
}

const deletePersonalTask = async(data, callback)=> {
    try{
        const deletePersonalTask = await PersonalTask.findByIdAndDelete(data.id)
        return callback(null, deletePersonalTask);
    } catch(error) {
        return callback(error);
    }
}

const showAllPersonalTask = async(callback) => {
    try {
        const showAllTask = await PersonalTask.find();
        return callback(null, showAllTask)
    } catch(error){
        return callback(error);
    }
}

const showPersonalTaskDetail = async(data, callback) => {
    try {
        const showTaskDetail = await PersonalTask.findById(data.task_id);
        return callback(null, showTaskDetail);
    } catch(error) {
        return callback(error)
    }
}

module.exports = {
    createPersonalTask,
    updatePersonalTask,
    deletePersonalTask,
    showAllPersonalTask,
    showPersonalTaskDetail
}