const { messages } = require("../utils/app.constant");
const { createJson } = require("../utils/app.helpers");

module.exports = (error, request, response, next) => {
  try {
    console.error(error);
    const status = error.status ?? 500;
    const message = error.message ?? messages.failure;
    response.status(status).json(createJson(status, message));
  } catch (error) {
    response.status(500).json(createJson(500, messages.error));
  }
};
