const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

const {
    createProject,
    updateProject,
    deleteProject,
    showActiveProject,
    showIndividualProject,
    showProjectDetails,
    showProjectDetailsofEmployee,
    showIndividualProjectDetailsofEmployee
} = require('../controllers/project.controller');
const {
  checkLogin,
  checkIsAdmin,
} = require('../middlewares/authorization');


const {
  validationError,
} = require('../helpers/validationError.helper');

const {createProjectvalidator, updateProjectvalidator} = require('../validations/project.validation')

router.post(
  '/createProject',
  validate(createProjectvalidator),
  checkLogin,
  checkIsAdmin,
  createProject,
);

router.post('/deleteProject', checkLogin, checkIsAdmin, deleteProject);


router.post('/updateProject', 
validate(updateProjectvalidator), 
checkLogin, checkIsAdmin, updateProject);

router.post(
  '/showActiveProject',
  checkLogin,
  checkIsAdmin,
  showActiveProject
);

router.post(
  '/showIndividualProject',
  checkLogin,
  checkIsAdmin,
  showIndividualProject
);

router.post('/showProjectDetails', showProjectDetails)
router.post('/showProjectDetailsofEmployee', showProjectDetailsofEmployee)
router.post('/showIndividualProjectDetailsofEmployee', checkLogin, showIndividualProjectDetailsofEmployee)

router.use(validationError);
module.exports = router;
