const Joi = require("joi");
module.exports = {
  createUserValidator: {
    body: Joi.object({

      employee_id_no: Joi.string().required(),

      name: Joi.string().min(3).max(30).required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'jp'] },
        })
        .required(),
      password: Joi.string().min(5).max(100).required(),

      // contact_number: Joi.string().pattern((/\+8801[1-9]\d{8}/)).required(),
      contact_number: Joi.string(),

      address: Joi.string().required(),
      description: Joi.string(),
      gender: Joi.string().valid('Male', 'Female', 'Other').required(),
      joining_date: Joi.date().required(),
      designation: Joi.string(),
      department_name: Joi.string(),

    }),

  },

  updateUserValidator: {
    body: Joi.object({
      id: Joi.string().required(),
      employee_id_no: Joi.string().required(),

      name: Joi.string().min(3).max(30).required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'jp'] },
        })
        .required(),
        // contact_number: Joi.string().pattern((/\+8801[1-9]\d{8}/)).required(),
        contact_number: Joi.string(),
        gender: Joi.string().valid('Male', 'Female', 'Other').required(),
        address: Joi.string().required(),
        description: Joi.string(),
        joining_date: Joi.date().required(),
        designation: Joi.string(),
        department_name: Joi.string(),
    }),
  },

  changePasswordValidator: {
    body: Joi.object({
      old_password: Joi.string().required(),
      new_password: Joi.string().min(5).max(100).required(),
      //access_token: Joi.string().required(),
    }),
  },

  loginUserValidator: {
    body: Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'jp'] },
        })
        .required(),
      password: Joi.string().min(8).required(),
    }),
  },
};

