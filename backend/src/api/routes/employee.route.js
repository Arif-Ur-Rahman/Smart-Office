const express = require("express");
const router = express.Router();
//
const { validate } = require("express-validation");
//
const {
  createUser,
  uploadEmployeeImage,
  login,
  logout,
  isLogin,
  accessAdmin,
  showActiveUsers,
  deleteUser,
  updateUser,
  showUser,
  forgetPassword,
  resetPassword,
  changePassword,
} = require("../controllers/employee.controller");
const { checkLogin, checkIsAdmin } = require("../middlewares/authorization");
const {
  createUserValidator,
  updateUserValidator,
  changePasswordValidator,
  loginUserValidator,
} = require("../validations/employee.validation");
const { validationError } = require("../helpers/validationError.helper");

//For uploading employee image
const { upload } = require("../middlewares/employee.image")
// console.log("Upload Image are:", upload)

router.post(
  "/createUser",
  validate(createUserValidator),
  checkLogin,
  checkIsAdmin,
  createUser
);
// 

router.post(
  "/uploadEmployeeImage",
  checkLogin,
  checkIsAdmin,
  upload.single('img'),
  uploadEmployeeImage
);



router.post(
  '/deleteUser',
  // validate(updateUserValidator),
  checkLogin,
  checkIsAdmin,
  deleteUser
);
router.post(
  '/updateUser',
  validate(updateUserValidator),
  checkLogin,
  checkIsAdmin,
  updateUser
);
//
router.post("/login", login);
router.post('/logout', checkLogin, logout);
router.post('/isLogin', checkLogin, isLogin);
router.post('/accessAdmin', checkLogin, accessAdmin);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', resetPassword);
//
router.post(
  '/showUser',
  checkLogin,
  //checkIsAdmin, 
  showUser
);
router.post(
  "/changePassword",
  checkLogin,
  validate(changePasswordValidator),
  changePassword
);
router.post(
  "/showActiveUsers",
  checkLogin,
  showActiveUsers
);

router.use(validationError);
module.exports = router;
