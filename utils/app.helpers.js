async function sendError(res, status, message, err) {
  console.log(err);
  return sendResponse(
    res,
    status ? status : null,
    err && err.message ? err.message : message,
    err
  );
}

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
  sendError,
  createJson,
  validateWithJoi,
};
