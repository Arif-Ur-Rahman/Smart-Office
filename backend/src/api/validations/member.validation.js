const Joi = require("joi");
module.exports = {
  createMemberValidation: {
    body: Joi.object({
      employee: Joi.string().required(),
      role: Joi.string().valid('Manager', 'Tech Manager', 'General Manager', 'Leader', 'Sub Leader',  'Trainer', 'Software Engineer', 'Trainee').required(),
      project: Joi.string().required(),
    
    }),

  },

  updateMemberValidation: {
    body: Joi.object({
        id: Joi.string().required(),
        employee: Joi.string().required(),
        role: Joi.string().valid('Manager', 'Tech Manager', 'General Manager', 'Leader', 'Sub Leader',  'Trainer', 'Software Engineer', 'Trainee').required(),
        project: Joi.string().required(),
    }),
  },
};

