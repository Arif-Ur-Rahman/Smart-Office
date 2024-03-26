const Joi = require('joi')

module.exports = {
    createProjectvalidator: {
        body: Joi.object({
            title : Joi.string().min(3).required(),
            description: Joi.string().min(3).required(),
            version_number: Joi.string().required(),
            git_link: Joi.string(),
            start_date: Joi.date(), 
            end_date: Joi.date(), 
            progress_percentage: Joi.number(),
            technologies: Joi.array().items(Joi.string()),
            member:Joi.array().items(Joi.string()),
            project_id: Joi.string(),
            priority: Joi.string(),
            status: Joi.string().valid('Running', 'Cancel', 'On-Hold', 'Complete'),
        })
    },

    updateProjectvalidator: {
        body: Joi.object({
            id: Joi.string(),
            title : Joi.string().min(3).required(),
            description: Joi.string().min(3).required(),
            version_number: Joi.string().required(),
            git_link: Joi.string(),
            start_date: Joi.date(), 
            end_date: Joi.date(), 
            progress_percentage: Joi.number(),
            technologies: Joi.array().items(Joi.string()),
            member:Joi.array().items(Joi.string()),
            project_id: Joi.string(),
            priority: Joi.string(),
            status: Joi.string().valid('Running', 'Cancel', 'On-Hold', 'Complete'),
        })
    }
};







// title : Joi.string().min(3).required(),
// description: Joi.string().min(3).required(),
// version_number: Joi.string(),
// git_link: Joi.string(),
// start_date: Joi.date(),
// end_date: Joi.date(),
// progress_percentage: Joi.string(),
// technologies: Joi.string(),
// states: Joi.string(),
// priority: Joi.string()