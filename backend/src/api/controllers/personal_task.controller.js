const {
    createPersonalTask,
    updatePersonalTask,
    deletePersonalTask,
    showAllPersonalTask,
    showPersonalTaskDetail
} = require('../services/personal_task.service');

const createPersonalTaskForEmoloyee = async(req, res) => {
    const data = req.body;
    await createPersonalTask(data, (error, results)=>{
        if(!error) {
            if(results){
                res.status(200).json({
                    success: true,
                    message: 'Personal task added successfully',
                    body: results,
                });
            } else{
                res.status(404).json({
                    success: false,
                    message: 'Task Not Found',
                    body: null,
                });
            }

        } else{
            res.status(400).json({
                success: false,
                message: error.message,
                body: null,
            });
        }
    });
}

const updatePersonalTaskForEmployee = async(req, res) => {
    const data = req.body;
    await updatePersonalTask(data, (error, results)=>{
        if(! error){
            if(results){
                res.status(200).send({
                    success: true,
                    message: 'Personal task updated successfully',
                    body: results,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Personal Task not found',
                    body: null,
                })
            }
        } else {
            res.status(400).send({
                success: false,
                message: error.message,
                body: null,
            })
        }
    });
}

const deletePersonalTaskForEmployee = async(req, res) => {
    const data = req.body;
    await deletePersonalTask(data, (error, results)=>{
        if(! error){
            if(results){
                res.status(200).send({
                    success: true,
                    message: 'Personal task deleted successfully',
                    body: results,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Personal Task not found',
                    body: null,
                })
            }
        } else {
            res.status(400).send({
                success: false,
                message: error.message,
                body: null,
            })
        }
    });
}

const showAllPersonalTaskForTheEmployee = async (req, res) => {
    await showAllPersonalTask((error, results)=> {
        if(! error){
            if(results){
                res.status(200).send({
                    success: true,
                    message: 'All personal task showed successfully',
                    body: results,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'All personal Task not found',
                    body: null,
                })
            }
        } else {
            res.status(400).send({
                success: false,
                message: error.message,
                body: null,
            })
        }
    });
}

const showAllTaskForTheEmployee = async(req, res) => {
    const data = req.body;
    await showPersonalTaskDetail(data, (error, results) => {
        if(! error){
            if(results){
                res.status(200).send({
                    success: true,
                    message: 'Task detail showed successfully',
                    body: results,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Task Detail not found',
                    body: null,
                })
            }
        } else {
            res.status(400).send({
                success: false,
                message: error.message,
                body: null,
            })
        }
    })
}

module.exports = {
    createPersonalTaskForEmoloyee,
    updatePersonalTaskForEmployee,
    deletePersonalTaskForEmployee,
    showAllPersonalTaskForTheEmployee,
    showAllTaskForTheEmployee
}