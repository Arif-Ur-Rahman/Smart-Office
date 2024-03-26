const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const {
    createTask,
    deleteTask,
    addTaskMember,
    deleteTaskMember,
    updateTask,
    showActiveTask,
    changeTaskPosition,
    showIndividualTaskUnderProject,
    showTaskDetails,
    TaskStatusNew,
    taskStateBacklog,
    taskStateReady,
    taskStateInProgress,
    taskStateInReview,
    taskStateDone,
    moveTask,
    downloadXlxs,
    showStatewiseTaskAccordingToEmployeeID,
    stateWiseTaskShifted
} = require('../controllers/task.controller');
const {
  checkLogin,
  checkIsAdmin,
   checkRole
  
} = require('../middlewares/authorization');

// const {checkRole} = require('../middlewares/checkRole')

// const {
//   createUserValidator,
//   updateUserValidator,
//   changePasswordValidator,
//   loginUserValidator,
// } = require('../validations/employee.validation');

const {
  validationError,
} = require('../helpers/validationError.helper');





router.post('/addTaskMember', checkLogin ,checkIsAdmin, addTaskMember);

router.post('/deleteTaskMember', checkLogin, checkIsAdmin, deleteTaskMember);
router.post('/changeTaskPosition', 
// checkLogin, 
changeTaskPosition);




//CRUD for Task

router.post(
  '/createTask',
  // checkRole,
  //   validate(createUserValidator),
  checkLogin,
  //checkIsAdmin,
  createTask
);


//This is for showing all the tasks for all the projects
router.post(
  '/showActiveTask',
  //checkRole,
  checkLogin,
  showActiveTask
);

router.post('/updateTask', 
checkRole,
checkLogin, checkIsAdmin, 
updateTask);

router.post('/deleteTask', 
checkRole,
checkLogin, checkIsAdmin,
 deleteTask);



//New Added by Fahim
router.post('/showTaskUnderProject',checkLogin, showIndividualTaskUnderProject );
router.post('/showTaskDetails',checkLogin,  showTaskDetails);

//For different status
router.post('/taskStatusNew',checkLogin, TaskStatusNew );
router.post('/taskStateBacklog',checkLogin, taskStateBacklog );
router.post('/taskStateReady',checkLogin, taskStateReady );
router.post('/taskStateInProgress',checkLogin, taskStateInProgress );
router.post('/taskStateInReview',checkLogin, taskStateInReview );
router.post('/taskStateDone',checkLogin, taskStateDone );

//move task
router.post('/moveTask',checkLogin, moveTask );



//For downloading file
router.get('/downloadXlxs', downloadXlxs)





//Show statewise project task using empoyee ID
router.post('/showTaskByTheEmployee', showStatewiseTaskAccordingToEmployeeID);
//Task shifted from one state to another state
router.post('/shiftedTaskFromOneStateToAnotherState',
checkLogin, 
checkIsAdmin, 
stateWiseTaskShifted)

router.use(validationError);
module.exports = router;


