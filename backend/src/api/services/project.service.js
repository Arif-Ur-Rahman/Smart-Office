//const { populate } = require('../models/task.model');
const Project = require('../models/project.model');
const Member = require('../models/member.model');
const { findById } = require('../models/task.model');

module.exports = {
  createProject: async (data, callback) => {
    try { 
      const project = new Project({
        title: data.title,
        description: data.description,
        version_number: data.version_number,
        git_link: data.git_link,
        start_date: data.start_date,
        end_date: data.end_date,
        progress_percentage: data.progress_percentage,
        technologies:data.technologies,
        status:data.status,
        priority:data.priority,
        member: data.member

        //Add after task is created
        //tasks:data.tasks,

        // assign_members: data.assign_members,
        // states: defaultState,
        // priority_level: data.priority_level,
        // technologies: data.technologies,
        // active_status: true,
                // current_status: data.current_status,
        // schedule_link: data.schedule_link,
        
      });
      const newProject = await project.save();
      return callback(null, newProject);
    } catch (error) {
      return callback(error);
    }
  },

  deleteProject: async (data, callback) => {
    try {
      const deleteProject = await Project.findByIdAndUpdate(data.id, {
        active_status: false,
      }, {new: true},);
      return callback(null, deleteProject);
    } catch (error) {
      return callback(error);
    }
  },


  // findProject: async(data, callback) =>{
  //   try{
  //     const findProject = await Project.findOne(data.project_id{

  //     })
  //   }
  // },

  updateProject: async (data, callback) => {
    try {
      const updateProject = await Project.findByIdAndUpdate(data.id, {
        title: data.title,
        description: data.description,
        version_number: data.version_number,
        git_link: data.git_link,
        start_date: data.start_date,
        end_date: data.end_date,
        progress_percentage: data.progress_percentage,
        technologies:data.technologies,
        status:data.status,
        priority:data.priority,
        member: data.member
      }, {new: true},);
      return callback(null, updateProject);
    } catch (error) {
      return callback(error);
    }
  },

   showActiveProject: async (req, callback) => {
    try {
      data = req.data;

      const showActiveProject= await Project.find({
        active_status: true,
      }).populate({ path: 'member',
      populate: {
        path: 'employee',
        model: 'employee'
      }
    })
      //Chnages for new database
      // .populate({path: 'assign_members', match:{'active_status': true,},
      //       populate:{ path: 'employee', match:{'active_status': true,}, select: 'name', }})
      // .populate({path: 'assign_members', match:{'active_status': true,},
      //       populate:{ path: 'role', match:{'active_status': true,}, select: 'title'}})
      // .populate({path: 'current_status', match:{'active_status': true,}, select: 'title'})
      // .populate({path: 'priority_level', match:{'active_status': true,}, select: 'title'})
      // .populate({path: 'technologies', match:{'active_status': true,}, select: 'title'});
      return callback(null, showActiveProject);
    } catch (error) {
      return callback(error);
    }
  },

  //Before Code
  showIndividualProject: async(data, callback) => {
    try {
       var member = await Member.find({employee: data.employeeId, active_status: true,});
       

       const myProject = [];
       for(let i = 0; i< member.length; i++)
      {
        myProject.push(member[i]._id + '');
      }
     // console.log(data);


      const showIndividualProject = await Project.find({
        "assign_members": { "$in": myProject },
        active_status: true,
      })
      // .populate({path: 'assign_members', match:{'active_status': true,},
      //       populate:{ path: 'employee', match:{'active_status': true,}, select: 'name', }})
      // .populate({path: 'assign_members', match:{'active_status': true,},
      //       populate:{ path: 'role', match:{'active_status': true,}, select: 'title'}})
      // .populate({path: 'current_status', match:{'active_status': true,}, select: 'title'})
      // .populate({path: 'priority_level', match:{'active_status': true,}, select: 'title'})
      // .populate({path: 'technologies', match:{'active_status': true,}, select: 'title'});
     // console.log(showIndividualProject);
      return callback(null, showIndividualProject);
    } catch (error) {
      return callback(error);
    }
  },


  //Changes done by Fahim
  showMemberIndividualProject:  async(data, callback) =>{
    try{
      showMemberIndividualProject = await Member.findOne({"employee":employee})
      return callback(null, showMemberIndividualProject)
    }catch(error){
      return callback(error)
    }
  },

  //show individual project details
  // showProjectDetails : async(data, callback) =>{
  //   try{
  //     const showProjectDetails = await Project.findById(data.id).populate('task')
  //     // .populate({path: 'technologies', match:{'active_status': true,}, select: 'title'});
  //     return callback(null, showProjectDetails)
  //   }catch(error){
  //     return callback(error)
  //   }
  // },



    //show project details
    showProjectDetails : async(data, callback) =>{
      try{
        const showProjectDetails = await Project.find({"id":data.id}).populate({ path: 'member',
        populate: {
          path: 'employee',
          model: 'employee'
        }
      })
        return callback(null, showProjectDetails)
      }catch(error){
        return callback(error)
      }
    },


    showProjectDetailsofEmployee: async(data,callback) =>{
      try{

        const showProjectDetailsofEmployee = await Project.find({ member: { $in: [data.id] } })
        return(null, showProjectDetailsofEmployee)
      }catch(error){
        return callback(error)
      }
    },



    // showIndividualProjectDetailsofEmployee: async(member_id,callback) =>{
    //   try{
    //       // console.log("The member Id is ", member_id)

    //     const abc = await Project.find({member: { $in: member_id }})
    //     // .populate('project')
    //     // .populate('project')

    //     console.log("The result is", abc)
       
    //     return(null, abc)
    //   }catch(error){
    //     return callback(error)
    //   }
    // }






        //show project details
        showIndividualProjectDetailsofEmployee : async(member_id,callback) =>{
          try{
            const showIndividualProjectDetailsofEmployee = await Project.find({member: { $in: member_id }})
            .populate({path:'member', select:'role',
            populate:{
              path: "employee",
              model: "employee",
              select: "name"
            }
            })
          
            console.log(showIndividualProjectDetailsofEmployee)
            return callback(null, showIndividualProjectDetailsofEmployee)
          }catch(error){
            return callback(error)
          }
        },

  // --- End Here---
};
 