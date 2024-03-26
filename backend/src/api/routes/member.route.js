const express = require('express');
const router = express.Router();

const { validate } = require("express-validation");

const {
    addMember,
    deleteMember,
    updateMember,
    showActiveMembers,
} = require('../controllers/member.controller');

const {
  checkLogin,
  checkIsAdmin,
} = require('../middlewares/authorization');

const { createMemberValidation, 
  updateMemberValidation } = require('../validations/member.validation');

const {
  validationError,
} = require('../helpers/validationError.helper');

router.post(
  '/addMember',
  validate(createMemberValidation),
  checkLogin,
  checkIsAdmin,
  addMember
);

router.post('/deleteMember',
 checkLogin,
  checkIsAdmin,
   deleteMember);

router.post(
  '/updateMember',
  validate(updateMemberValidation),
   checkLogin,
   checkIsAdmin, 
   updateMember);

router.post(
  '/showActiveMembers',
  checkLogin,
  checkIsAdmin,
  showActiveMembers
);

router.use(validationError);
module.exports = router;
