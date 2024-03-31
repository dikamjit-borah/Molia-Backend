const Joi = require("joi");
const { collections } = require("../utils/app.constant");

module.exports = {
  API_POST_SAVE: Joi.object({
    user_id: Joi.string().required(),
    entry_type: Joi.string().required().valid(...Object.values(collections)),
  }),
};
