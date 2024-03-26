const config = require('./src/config/development.json');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
//------->>>...
app.use('/uploads/employee_image', express.static('./uploads/employee_image'));
//
const userRouter = require('./src/api/routes/employee.route');
const memberRouter = require('./src/api/routes/member.route');
const taskRouter = require('./src/api/routes/task.route');
const personalTaskRouter = require('./src/api/routes/personal_task.route');
const projectRouter = require('./src/api/routes/project.route');

app.use(express.json());
app.use(bodyParser.json());
app.use(
  // cors({
  //   origin: '*',
  //   credentials: true,
  //   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  // })
  cors(config.cors)
);
app.use('/api/users', userRouter);
app.use('/api/members', memberRouter);
app.use('/api/task', taskRouter);
app.use('/api/personalTask', personalTaskRouter);
app.use('/api/project', projectRouter);
//

module.exports = app;
