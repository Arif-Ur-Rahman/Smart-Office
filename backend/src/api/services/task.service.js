//const { populate } = require('../models/task.model');
const Task = require('../models/task.model');
const Member = require('../models/member.model');
const XLSX = require('xlsx');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = {
  createTask: async (data, loginID, callback) => {
    // console.log("loginID ", loginID)
    try {
      const task = new Task({
        title: data.title,
        description: data.description,
        assigned_to: data.assigned_to,
        assigned_by: loginID,
        state: data.state,
        start_date: data.start_date,
        end_date: data.end_date,
        project_id: data.project_id
      });

      const newTask = await task.save();

      return callback(null, newTask);
    } catch (error) {
      return callback(error);
    }
  },

  deleteTask: async (data, callback) => {
    // try {
    //   const deleteTask = await Task.findByIdAndUpdate(data.id, {
    //     active_status: false,
    //   },{new: true},);
    //   const stateUpdate = await State.updateOne( { _id: data.state }, { $pull: { tasks: data.id} } );
    //   return callback(null, deleteTask);
    // } 
    try {
      const deleteTask = await Task.findByIdAndDelete(data.id)

      return callback(null, deleteTask)
    } catch (error) {
      return callback(error);
    }
  },

  updateTask: async (data, callback) => {
    try {
      const updateTask = await Task.findByIdAndUpdate(data.id, {
        // title: data.title,
        // description: data.description,
        // active_status: true,
        // difficulty_level: data.difficulty_level,
        // start_time: data.start_time,
        // end_time: data.end_time,

        title: data.title,
        description: data.description,
        assigned_to: data.assigned_to,
        assigned_by: data.assigned_by,
        state: data.state,
        schedule: data.schedule,
        role: data.role



      }, { new: true },);
      return callback(null, updateTask);
    } catch (error) {
      return callback(error);
    }
  },

  addTaskMember: async (data, callback) => {
    try {
      const checkMember = Member.findOne({ _id: data.memberId, active_status: true });

      // const project = data.project;
      console.log(checkMember);
      if (checkMember) {
        const newMember = await Task.findByIdAndUpdate(data.id,
          { $push: { assigned_to: data.memberId } },
          { new: true },
        );
        return callback(null, newMember);
      };
    } catch (error) {
      return callback(error);
    }
  },

  deleteTaskMember: async (data, callback) => {
    try {
      const deleteTaskMember = await Task.updateOne({ _id: data.id }, { $pull: { assigned_to: data.assigned_to } }, { new: true, });
      return callback(null, deleteTaskMember);
    } catch (error) {
      return callback(error);
    }
  },

  showActiveTask: async (callback) => {
    try {

      const showActiveTask = await Task.find({
        active_status: true,
      })
      // .populate('assigned_to')
      // .populate('assigned_by')
      .populate({path: 'assigned_to',  populate: {path:'employee', model:'employee'}})
      .populate({path: 'assigned_by', model:'employee'})
      


      return callback(null, showActiveTask);
    } catch (error) {
      return callback(error);
    }
  },

  changeTaskPosition: async (data, callback) => {
    try {
      if (data.stateFromId == data.stateToId) {
        const stateTaskPull = await State.updateOne({ _id: data.stateFromId }, { $pull: { tasks: data.id } });
        const stateTaskPush = await State.updateOne({ _id: data.stateFromId },
          {
            $push: {
              tasks: {
                $each: [data.id],
                $position: data.currentPosition
              }
            }
          });

        return callback(null, stateTaskPush);
      }
      else {
        const stateTaskPush = await State.updateOne({ _id: data.stateToId },
          {
            $push: {
              tasks: {
                $each: [data.id],
                $position: data.currentPosition
              }
            }
          });
        const stateTaskPull = await State.updateOne({ _id: data.stateFromId }, { $pull: { tasks: data.id } });

        return callback(null, stateTaskPush);
      }
    } catch (error) {
      return callback(error);
    }

  },

  //Changes by fahim

  showIndividualTaskUnderProject: async (data, callback) => {
    try {
      const showIndividualTaskUnderProject = await Task.find({ "project_id": data.project_id })
      return callback(null, showIndividualTaskUnderProject)
    } catch (error) {
      return callback(error)
    }
  },
  //show task details
  showTaskDetails: async (data, callback) => {
    try {
      const showTaskDetails = await Task.findById(data.id)
      .populate({path:"assigned_to",
            populate:{
              path: "employee",
              model: "employee",
              select: "name"
            }
    })
      .populate({path:'assigned_by', select:'name'})
      return callback(null, showTaskDetails)
    } catch (error) {
      return callback(error)
    }
  },



  //Move task state
  moveTask: async (data, callback) => {
    try {
      const moveTask = await Task.findByIdAndUpdate(data.id, {
        state: data.state,
      }, { new: true },);
      return callback(null, moveTask);
    } catch (error) {
      return callback(error);
    }
  },



  //Position changes for Task status 
  changePositionOfTask: async (data, callback) => {
    console.log(data)
    try {
      const changePositionOfTask = await Task.findByOneAndUpdate(
        { _id: data.id, status: data.status },
        { position_from: data.position_from, position_to: data.position_to },
        { new: true }
      );
      return callback(null, changePositionOfTask)
    } catch (error) {
      return callback(error)
    }
  },

  // taskUnderProject: async(data, callback)=>{
  //   const taskUnderProject = await Task.find
  // }


  // {_id:data.id, status:data.status},{
  //   position_from: data.position_from,
  //   position_to: data.position_to
  // },{new: true}

  // { _id: taskId, title: taskTitle }, // Query for the task by ID and title
  //     { status: taskStatus }, // Update the task's status field
  //     { new: true } 
  // --- End Here---


  /** Different states **/

  //For state NEW
  TaskStatusNew: async (data, callback) => {
    try {
      const TaskStatusNew = await Task.find({ "project_id": data.project_id, state: "NEW" }).sort({ state: -1 })
      return callback(null, TaskStatusNew)
    } catch (error) {
      return callback(error)
    }
  },


  //For state BACKLOG
  taskStateBacklog: async (data, callback) => {
    try {
      const taskStateBacklog = await Task.find({ "project_id": data.project_id, state: "BACKLOG" }).sort({ state: -1 })
      return callback(null, taskStateBacklog)
    } catch (error) {
      return callback(error)
    }
  },


  //For state READY
  taskStateReady: async (data, callback) => {
    try {
      const taskStateReady = await Task.find({ "project_id": data.project_id, state: "READY" })
      return callback(null, taskStateReady)
    } catch (error) {
      return callback(error)
    }
  },

  //For state IN_PROGRESS
  taskStateInProgress: async (data, callback) => {
    try {
      const taskStateInProgress = await Task.find({ "project_id": data.project_id, state: "IN_PROGRESS" })
      return callback(null, taskStateInProgress)
    } catch (error) {
      return callback(error)
    }
  },

  //For state IN_REVIEW
  taskStateInReview: async (data, callback) => {
    try {
      const taskStateInReview = await Task.find({ "project_id": data.project_id, state: "IN_REVIEW" })
      return callback(null, taskStateInReview)
    } catch (error) {
      return callback(error)
    }
  },

  //For state DONE
  taskStateDone: async (data, callback) => {
    try {
      const taskStateDone = await Task.find({ "project_id": data.project_id, state: "DONE" })
      return callback(null, taskStateDone)
    } catch (error) {
      return callback(error)
    }
  },





  //Downloading Xlxs file
  downloadXlxs: async (callback) => {
    try {
      // const taskID = data.id
      const tasks = await Task.find().populate({
        path: 'assigned_to',
        populate: {
          path: 'employee',
          model: 'employee',
          select:'name'
        }
      })
      .populate({path:'assigned_by',

        select:'name'
      
      })
      console.log("The tsaks are ", tasks)

      const data = tasks.map((task) => ({

        Title: task.title,
        Description: task.description,
        State: task.state,
        Schdule: task.schedule,
        Created_AT: task.createdAt,
        Updated_AT: task.updatedAt,
        AssignTo: task.assigned_to.map(e=>e.employee.name).join(', '),
        AssignBy: task.assigned_by.name,

      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');

      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      callback(null, buffer)

    
    } catch (err) {
      callback(err)
    }
  },

  //Show statewise project task using empoyee ID
  showStatewiseTaskAccordingToEmployeeID: async (data, callback) => {
    // console.log("Requested data are:", data)
    try {
      const employeeid= data.id;
      const member_id = await Member.findOne({employeeid})
      console.log("Member id is", member_id)
    
      const showAssigned = await Task.find().and([
        { assigned_to: { $in: [member_id] } }, {
          state: data.state,
        }])
        .populate({
          path: 'assigned_to',
          populate: {
            path: 'employee',
            select: 'name'
          }
        })
        .populate({
          path: 'assigned_by',
            select: 'name'
        })
      // .populate({path:'difficulty_level', select: 'title'});
      return callback(null, showAssigned);
    } catch (error) {
      return callback(error);
    }
  },

  stateWiseTaskShifted: async (data, loginId, callback) => {
    const currentDate = Date.now();
    try {
      const showAssigned = await Task.findByIdAndUpdate(data.task_id,
        {
          state: data.state,
          time_of_update_state: currentDate,
          updated_by_this_state: loginId
        },
        { new: true, }
      );

      return callback(null, showAssigned);
    } catch (error) {
      return callback(error);
    }
  },

}