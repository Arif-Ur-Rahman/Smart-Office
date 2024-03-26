const express = require('express');
const router = express.Router();

const {
    createPersonalTaskForEmoloyee,
    updatePersonalTaskForEmployee,
    deletePersonalTaskForEmployee,
    showAllPersonalTaskForTheEmployee,
    showAllTaskForTheEmployee
} = require('../controllers/personal_task.controller');

const {
    checkLogin,
  } = require('../middlewares/authorization');

  router.post('/createPersonalTask', checkLogin, createPersonalTaskForEmoloyee);
  router.post('/updatePersonalTask', checkLogin, updatePersonalTaskForEmployee);
  router.post('/deletePersonalTask', checkLogin, deletePersonalTaskForEmployee);
  router.post('/showAllPersonalTask', checkLogin, showAllPersonalTaskForTheEmployee);
  router.post('/showPersonalTaskDetail', checkLogin, showAllTaskForTheEmployee);

  module.exports = router;
