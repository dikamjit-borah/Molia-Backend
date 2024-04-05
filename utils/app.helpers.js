function createJson(status, message, data) {
  return {
    status,
    message,
    data,
  };
}

function validateWithJoi(schema, payload) {
  return schema.validate(payload);
}

module.exports = {
  createJson,
  validateWithJoi,
};
