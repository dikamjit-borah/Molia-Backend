const { sendError, validateWithJoi } = require("../utils/app.helpers");

module.exports = {
  validateRequest: (schema) => {
    return (req, res, next) => {
      const { error } = validateWithJoi(schema, {
        ...req.params,
        ...req.query,
        ...req.body,
      });
      const valid = error == null;
      if (!valid) {
        return sendError(res, 400, "Bad Request", error.details[0]);
      } else {
        next();
      }
    };
  },
};
