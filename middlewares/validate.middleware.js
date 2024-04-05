const NE = require("node-exceptions");
const { validateWithJoi } = require("../utils/app.helpers");

module.exports = {
  validateRequest: (schema) => {
    return (req, res, next) => {
      try {
        const { error } = validateWithJoi(schema, {
          ...req.params,
          ...req.query,
          ...req.body,
        });
        const valid = error == null;
        if (!valid) {
          throw new NE.InvalidArgumentException(
            `Bad Request ${error.details[0].message}`,
            400
          );
        } else {
          next();
        }
      } catch (error) {
        next(error);
      }
    };
  },
};
