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

  API_GET_TITLES: Joi.object({
    user_id: Joi.string().required(),
    collection: Joi.string()
      .required()
      .valid(...Object.values(collections)),
    sub_collection: Joi.string(),
  }),

  API_GET_SUB_COLLECTION: Joi.object({
    user_id: Joi.string().required(),
  }),
};
