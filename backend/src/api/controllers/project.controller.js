const {
    createProject,
    updateProject,
    deleteProject,
    showActiveProject,
    showIndividualProject,
    showMemberIndividualProject,
    showProjectDetails,
    showIndividualProjectDetailsofEmployee,
    showProjectDetailsofEmployee
} = require('../services/project.service');

const Project = require('../models/project.model');
const Member = require('../models/member.model');

module.exports = {
  createProject: async (req, res) => {
    const data = req.body;
    await createProject(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: 'Project added successfully',
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  deleteProject: async (req, res) => {
    const data = req.body;
    await deleteProject(data, (error, results) => {
      if (!error) {
        if (results != null) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Project deleted successfully',
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: 'Project Not Found',
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  updateProject: async (req, res) => {
    const data = req.body;
    await updateProject(data, (error, results) => {
      if (!error) {
        if (results != null) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'project updated successfully',
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: 'Project Not Found',
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  showActiveProject: async (req, res) => {
    const data = req.body;
    await showActiveProject(req, async (error, results) => {
      if (!error) {
        if (results) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Project List found',
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: 'Project List not found',
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  showIndividualProject: async (req, res) => {
    const data = req.body;
    await showMemberIndividualProject(data, async (error, results) => {
      if (!error) {
        if (results) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Individual Project List found',
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: 'Individual Project List not found',
            body: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },


//showing project details
  // showProjectDetails: async(req,res) =>{
  //   const data = req.body;
  //   await showProjectDetails(data, async(error, results)=>{
  //     if(!error){
  //       if(results){
  //         res.status(200).json({
  //           status: 200,
  //           success: true,
  //           message: "Project Details shown",
  //           body: results,
  //         });
  //       }else{
  //         res.status(404).json({
  //           status: 404,
  //           success:false,
  //           message:"Project details Not found",
  //           body: null,
  //         })
  //       }
  //     }else{
  //       res.status(400).json({
  //         status:400,
  //         success:false,
  //         message:error.message,
  //         body:null
  //       })
  //     }
  //   })
  // },




   //SHow Project Details
   showProjectDetails: async(req,res) =>{
    const data = req.body;
    await showProjectDetails(data, async(error, results)=>{
      if(!error){
        if(results){
          res.status(200).json({
            status: 200,
            success: true,
            message: "Project Details shown",
            body: results,
          });
        }else{
          res.status(404).json({
            status: 404,
            success:false,
            message:"Project details Not found",
            body: null,
          })
        }
      }else{
        res.status(400).json({
          status:400,
          success:false,
          message:error.message,
          body:null
        })
      }
    })
  },


   //SHow Project Details of employee
   showProjectDetailsofEmployee: async(req,res) =>{
    const data = req.body;
    await showProjectDetailsofEmployee(data, async(error, results)=>{
      if(!error){
        if(results){
          res.status(200).json({
            status: 200,
            success: true,
            message: "Project Details shown",
            body: results,
          });
        }else{
          res.status(404).json({
            status: 404,
            success:false,
            message:"Project details Not found",
            body: null,
          })
        }
      }else{
        res.status(400).json({
          status:400,
          success:false,
          message:error.message,
          body:null
        })
      }
    })
  },


   //SHow Project Details of employee
   showIndividualProjectDetailsofEmployee: async(req,res) =>{
    const login = req.id;
    console.log("Login ID", login)

    const member_id = await Member.find({ employee: login }).select('_id')

    console.log("The member ID is ", member_id)
    // const data = req.body;
    await showIndividualProjectDetailsofEmployee(member_id, async(error, results)=>{
      if(!error){
        if(results){
          res.status(200).json({
            status: 200,
            success: true,
            message: "Project Details shown",
            body: results,
          });
        }else{
          res.status(404).json({
            status: 404,
            success:false,
            message:"Project details Not found",
            body: null,
          })
        }
      }else{
        res.status(400).json({
          status:400,
          success:false,
          message:error.message,
          body:null
        })
      }
    })
  },


  // --- End Here---
};
