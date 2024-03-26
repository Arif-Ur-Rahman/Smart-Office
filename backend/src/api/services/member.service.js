const Member = require('../models/member.model');
const Project = require('../models/project.model');

module.exports = {
  addMember: async (data, loginId, callback) => {
    const projectID = data.project;
    // console.log("Project ID are:", projectID)
    // const employeeId = data.employee;
    try {
        const member = new Member({
          employee: data.employee,
          project: data.project,
          role: data.role,
          created_by: loginId,
        });
        const addMember = await member.save();

        const newMemberAssignToTheProject = await Project.findByIdAndUpdate(projectID,
          { $push: { member: addMember._id + '' } },
          { new: true },
        );

        const showNewAddedMember = await Member.findById(addMember._id + '')
          .populate({ path: 'employee', select: 'name' })
          return callback(null, showNewAddedMember)
        
    } catch (error) {
      return callback(error);
    }
  },

  deleteMember: async (data, callback) => {
    const projectID = data.project;
    try {
      const deleteMember = await Member.findByIdAndDelete(data.member_id);

      const deleteMemberFromTheProject = await Project.findByIdAndUpdate(projectID,
        { $pull: { member: data.member_id + '' } },
        { new: true },
      );

      return callback(null, deleteMember);
    } catch (error) {
      return callback(error);
    }
  },

  updateMember: async (data, loginId, callback) => {
    try {
      const updateMember = await Member.findByIdAndUpdate(data.id, {
        employee: data.employee,
        project: data.project,
        role: data.role,
        created_by: loginId,
      }, { new: true },);
      return callback(null, updateMember);
    } catch (error) {
      return callback(error);
    }
  },

  showActiveMembers: async (callback) => {
    try {
      const showActiveMembers = await Member.find({})
        .populate({ path: 'employee', select: 'name' })
        .populate({ path: 'created_by', select: 'name' });

      return callback(null, showActiveMembers);
    } catch (error) {
      return callback(error);
    }
  },
  // --- End Here---
};
