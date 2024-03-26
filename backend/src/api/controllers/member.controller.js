const {
    addMember,
    deleteMember,
    updateMember,
    showActiveMembers,
} = require('../services/member.service');
module.exports = {
    
  addMember: async (req, res) => {
    const data = req.body;
    const loginId = req.id;
    // console.log("Member data from clint", data);
    // console.log("Login data:", loginId)
    await addMember(data, loginId, (error, results) => {
      if (!error) {
        if(results){
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Member added successfully and assigned to the project',
            body: results,
          });
        } else{
          res.status(409).json({
            status: 409,
            success: false,
            message: "This Member already exists this project",
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

  deleteMember: async (req, res) => {
    const data = req.body;
    await deleteMember(data, (error, results) => {
      if (!error) {
        if (results != null) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Member deleted successfully',
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: 'Member Not Found',
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

  updateMember: async (req, res) => {
    const data = req.body;
    const loginId = req.id;
    await updateMember(data, loginId, (error, results) => {
      if (!error) {
        if (results != null) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Member updated successfully',
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: 'Member Not Found',
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

  showActiveMembers: async (req, res) => {
    await showActiveMembers( async (error, results) => {
      if (!error) {
        if (results) {
          res.status(200).json({
            status: 200,
            success: true,
            message: 'Member List found',
            body: results,
          });
        } else {
          res.status(404).json({
            status: 404,
            success: false,
            message: 'Member List not found',
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
  // --- End Here---
};
