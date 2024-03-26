const {
    createTask,
    updateTask,
    addTaskMember,
    deleteTask,
    deleteTaskMember,
    showActiveTask,
    changeTaskPosition,
    showIndividualTaskUnderProject,
    showTaskDetails,
    changePositionOfTask,
    TaskStatusNew,
    taskStateBacklog,
    taskStateReady,
    taskStateInProgress,
    taskStateInReview,
    taskStateDone,
    moveTask,
    showStatewiseTaskAccordingToEmployeeID,
    stateWiseTaskShifted,
    downloadXlxs
} = require('../services/task.service');

module.exports = {
    createTask: async (req, res) => {
        const data = req.body;
        const loginID = req.id;
        await createTask(data, loginID, (error, results) => {
            if (!error) {
                if(results){
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Task added successfully',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Task Not Found',
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

    deleteTask: async (req, res) => {
        const data = req.body;
        await deleteTask(data, (error, results) => {
            if (!error) {
                if (results != null) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Task deleted successfully',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Task Not Found',
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

    addTaskMember: async (req, res) => {
        const data = req.body;
        await addTaskMember(data, (error, results) => {
            if (!error) {
                if (results != null) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Member added successfully',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Member not found',
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
            };
        });
    },

    deleteTaskMember: async (req, res) => {
        const data = req.body;
        await deleteTaskMember(data, (error, results) => {
            if (!error) {
                if (results != null) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Member removed successfully',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Member not found',
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
            };
        });
    },

    updateTask: async (req, res) => {
        console.log(res.aaaa101);
        const data = req.body;
        await updateTask(data, (error, results) => {
            if (!error) {
                if (results != null) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'task updated successfully',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Task Not Found',
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

    showActiveTask: async (req, res) => {
        await showActiveTask( async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Task List found',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Task List not found',
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

    //changeTaskPosition
    changeTaskPosition: async (req, res) => {
        const data = req.body;
        await changePositionOfTask(data, (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Position changed successfully',
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Failed to change position',
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


    //Changes by Fahim
    showIndividualTaskUnderProject: async (req, res) => {
        const data = req.body;
        await showIndividualTaskUnderProject(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Individual Task Under Project List found',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Individual Task Under Project List NOT found',
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
        })
    },


    //SHow Task Details
    showTaskDetails: async (req, res) => {
        const data = req.body;
        await showTaskDetails(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: "Task Details shown",
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: "Task details Not found",
                        body: null,
                    })
                }
            } else {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: error.message,
                    body: null
                })
            }
        })
    },




    //API for differents status starts

    //New State
    TaskStatusNew: async (req, res) => {
        const data = req.body;
        await TaskStatusNew(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Individual Task Under Project for status NEW List found',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Individual Task Under Project for status nEW List NOT found',
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
        })
    },


    //New State
    taskStateBacklog: async (req, res) => {
        const data = req.body;
        await taskStateBacklog(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Individual Task Under Project for status BACKLOG List found',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Individual Task Under Project for status BACKLOG List NOT found',
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
        })
    },

    //Ready State
    taskStateReady: async (req, res) => {
        const data = req.body;
        await taskStateReady(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Individual Task Under Project for status READY List found',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Individual Task Under Project for status READY List NOT found',
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
        })
    },


    //Ready In progress
    taskStateInProgress: async (req, res) => {
        const data = req.body;
        await taskStateInProgress(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Individual Task Under Project for status READY List found',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Individual Task Under Project for status READY List NOT found',
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
        })
    },


    //State In Review
    taskStateInReview: async (req, res) => {
        const data = req.body;
        await taskStateInReview(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Individual Task Under Project for status In Review List found',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Individual Task Under Project for status In Review List NOT found',
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
        })
    },

    //State Done
    taskStateDone: async (req, res) => {
        const data = req.body;
        await taskStateDone(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Individual Task Under Project for status Done List found',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Individual Task Under Project for status Done List NOT found',
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
        })
    },


    //State Done
    moveTask: async (req, res) => {
        const data = req.body;
        await moveTask(data, async (error, results) => {

            if (!error) {
                if (results) {

                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Task moved',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'task DID NOT move',
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
        })
    },


    //Show statewise task according to assigned employee_member
    showStatewiseTaskAccordingToEmployeeID: async (req, res) => {
        const data = req.body;
        await showStatewiseTaskAccordingToEmployeeID(data, async (error, results) => {
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'State Wise Task List found By Employee Id',
                        body: results,
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Task List not found',
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

    //Task shifted from one state to another
    stateWiseTaskShifted: async (req, res) => {
        const data = req.body;
        const loginId = req.id;
        await stateWiseTaskShifted(data, loginId, async (error, results) => {
            // console.log("Results after task changeing:", results)
            if (!error) {
                if (results) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: 'Shifted Task successfully',
                        body: results,
                        // shifted_time: results.timeOfUpdateState
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'Task shift did not occour',
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




    downloadXlxs: async (req, res) => {

        await downloadXlxs(async (error, results) => {
            if (!error) {
                if (results) {
                    res.setHeader('Content-Disposition', 'attachment; filename="tasks.xlsx"');
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    res.send(results);
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'File not found',
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
        })


    }

    // --- End Here---
};