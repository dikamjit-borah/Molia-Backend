async function sendError(res, err, msg, status) {
  console.log(err);
  return sendResponse(
    res,
    status ? status : null,
    msg ? msg : null,
    null,
    err && err.message ? err.message : null
  );
}

async function sendResponse(res, status, msg, data, errs) {
  let response = {
    status: 500,
    message: "Something went wrong!",
  };
  if (status) response.status = status;
  if (msg) response.message = msg;
  if (data) response["data"] = data;
  if (errs) response["errors"] = errs;

  return res.status(status ? status : 500).send(response);
}

module.exports = {
  sendError,
  sendResponse,
};
