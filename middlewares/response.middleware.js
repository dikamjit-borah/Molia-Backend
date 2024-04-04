const { messages } = require("../utils/app.constant");

module.exports = (request, response, next) => {
  try {
    const oldJson = response.json;

    response.json = (data) => {
      let newJson = {};
      newJson = {
        message: data.message || messages.success,
        data: data?.data,
      };
      response.json = oldJson;

      // set response headers

      response.status(data.status ?? 200);
      return oldJson.call(response, newJson);
    };
    next();
  } catch (error) {
    next(error);
  }
};
