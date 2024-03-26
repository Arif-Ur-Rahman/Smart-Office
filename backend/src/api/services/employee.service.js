//Config
// const Config = require('../../config/development.json')

// Models
const User = require("../models/employee.model");
const Token = require("../models/reset_password.model");
const fs = require("fs");

module.exports = {
  createUser: async (fieldsData, callback) => {

    try {
      const cleckExistingEmail = await User.findOne({
        email: fieldsData.email,
      });
      if (!cleckExistingEmail) {
        const user = new User({
          employee_id_no: fieldsData.employee_id_no,
          name: fieldsData.name,
          email: fieldsData.email,
          password: fieldsData.hashedPassword,
          contact_number: fieldsData.contact_number,
          address: fieldsData.address,
          description: fieldsData.description,
          is_admin: false,
          active_status: true,
          gender: fieldsData.gender,
          joining_date: fieldsData.joining_date,
          // imageURL: filesData.filename,
          designation: fieldsData.designation,
          department_name: fieldsData.department_name,

          //delete later
          //role: fieldsData.role,
        });
        // console.log("filesData.path:", filesData.path)
        const newUser = await user.save();
        return callback(null, newUser, false);
      } else {
        return callback(null, null, true);
      }
    } catch (error) {
      return callback(error);
    }
  },

  uploadEmployeeImage: async (loginId, filesData, callback) => {
    try {
      const uploadEmployeeImage = await User.findByIdAndUpdate(loginId, {
        imageURL: filesData.filename,
      },
        { new: true, }
      );

      // console.log("Updated users are:", uploadEmployeeImage)

      return callback(null, uploadEmployeeImage);
    } catch (error) {
      return callback(error);
    }
  },

  deleteUser: async (data, callback) => {
    try {
      const deleteUser = await User.findByIdAndUpdate(data.id, {
        active_status: false,
      });
      return callback(null, deleteUser);
    } catch (error) {
      return callback(error);
    }
  },

  updateUser: async (fieldsData, callback) => {
    // console.log("Fields------>", fieldsData)
      // console.log("Files data are-----", filesData);
    // console.log("Updated Id are:---->>", fieldsData.id)
    try {
      const updateUser = await User.findByIdAndUpdate(fieldsData.id, {
        employee_id_no: fieldsData.employee_id_no,
        name: fieldsData.name,
        email: fieldsData.email,
        contact_number: fieldsData.contact_number,
        gender: fieldsData.gender,
        address: fieldsData.address,
        description: fieldsData.description,
        joining_date: fieldsData.joining_date,
        // imageURL: filesData.filename,
        designation: fieldsData.designation,
        department_name: fieldsData.department_name
      },
        { new: true, }
      );

      // console.log("Updated users are:", updateUser)

      return callback(null, updateUser);
    } catch (error) {
      return callback(error);
    }
  },

  login: async (data, callback) => {
    try {
      const loginUser = await User.findOne({
        email: data.email,
        active_status: true,
      });
      // console.log("Data after Login:", loginUser)
      return callback(null, loginUser);
    } catch (error) {
      return callback(error);
    }
  },

  logout: async (id, callback) => {
    try {
      // const updatinguser = await User.updateMany({}, {$set: {isActive: false}},{multi:true,new: true});
      //  console.log(updatinguser);

      const logoutUser = await User.findByIdAndUpdate(id, {
        isActive: false,
      }, { new: true, });
      //console.log(logoutUser);
      return callback(null, logoutUser);
    } catch (error) {
      return callback(error);
    }
  },

  isLogin: async (id, callback) => {
    try {
      const checkIsLogin = await User.findById(id);

      return callback(null, checkIsLogin);
    } catch (error) {
      return callback(error);
    }
  },

  changePassword: async (data, id, callback) => {
    try {
      const changePassword = await User.findByIdAndUpdate(id,
        {
          password: data.hashedPassword
        });
      return callback(null, changePassword);
    } catch (error) {
      return callback(error);
    }
  },

  forgetPassword: async (data, callback) => {
    try {
      const isExist = await User.findOne({ email: data.email });
      if (isExist) {
        return callback(null, isExist._id + '', true);
      } else {
        return callback(null, null, false);
      }
    } catch (error) {
      return callback(error);
    }
  },

  resetPassword: async (data, callback) => {
    try {
      const updatePassword = await User.findOneAndUpdate({ email: data.email },
        {
          password: data.hashedPassword,
        }, { new: true });
      if (updatePassword) {
        await Token.findOneAndDelete({ token: data.token });
      }
      return callback(null, updatePassword);
    } catch (error) {
      return callback(error);
    }
  },


  showUser: async (id, callback) => {
    try {
      const showUser = await User.findById(id)

      return callback(null, showUser);
    } catch (error) {
      return callback(error);
    }
  },

  showActiveUsers: async (data, callback) => {
    try {
      const showActiveUsers = await User.find(
        {
          active_status: true,
        },
        {
          password: 0,
        }
      ).sort({ employee_id_no: 1 })
      return callback(null, showActiveUsers);
    } catch (error) {
      return callback(error);
    }
  },

  accessAdmin: async (id, loginId, callback) => {
    // console.log("clint ID:", id)
    // console.log("login ID:", loginId)

    try {
      const checkAccessAdmin = await User.findById(id);
      // console.log("User admin objects:", checkAccessAdmin)
      if (checkAccessAdmin.id !== loginId) {

        if (checkAccessAdmin.is_admin === false) {
          const changeAdmin = await User.findByIdAndUpdate(checkAccessAdmin.id,
            {
              is_admin: true,

            }, { new: true, });
          return callback(null, changeAdmin, null);

        } else if (checkAccessAdmin.is_admin === true) {
          const changeAdmin = await User.findByIdAndUpdate(checkAccessAdmin.id,
            {
              is_admin: false,

            }, { new: true, });
          return callback(null, changeAdmin, null);

        }

      } else {
        const changeAdmin = {
          unchangeingIsAdmin: "Admin can't change own admin status"
        };
        return callback(null, null, changeAdmin);
      }

    } catch (error) {
      return callback(error);
    }
  },
  // --- End Here---
};
