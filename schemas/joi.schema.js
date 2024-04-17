const Joi = require("joi");
const { collections } = require("../utils/app.constant");

module.exports = {
  API_POST_SAVE: Joi.object({
    user_id: Joi.string().required(),
    collection: Joi.string()
      .required()
      .valid(...Object.values(collections)),
    sub_collection: Joi.string(),
    details: Joi.object(),
  }),

  API_GET_FETCH: Joi.object({
    user_id: Joi.string().required(),
    collection: Joi.string()
      .required()
      .valid(...Object.values(collections)),
    sub_collection: Joi.string(),
  }),
};
