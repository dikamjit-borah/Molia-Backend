async function sendError(res, status, message, err) {
  console.log(err);
  return sendResponse(
    res,
    status ? status : null,
    err && err.message ? err.message : message,
    err
  );
}

async function sendResponse(res, status, message, data) {
  const response = {
    status: 500,
    message: "Something went wrong!",
  };
  if (status) response.status = status;
  if (message) response.message = message;
  if (data) response["data"] = data;

  return res.status(status ? status : 500).send(response);
}

function validateWithJoi(schema, payload) {
  return schema.validate(payload);
}

module.exports = {
  sendError,
  sendResponse,
  validateWithJoi,
};
