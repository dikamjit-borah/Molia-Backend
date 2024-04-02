const { saveTitle, fetchTitles } = require("../services/service");
const { sendResponse, sendError } = require("../utils/app.helpers");

const save = async (req, res) => {
  res.send(await saveTitle(req.body));
};

const titles = async (req, res) => {
  const { user_id, entry_type } = { ...req.params, ...req.query };
  const titles = await fetchTitles({ user_id, entry_type });
  if (titles && titles.length)
    return sendResponse(
      res,
      200,
      `Successfully fetched ${entry_type} titles`,
      titles
    );
  return sendError(res, 404, `No ${entry_type} title found for ${user_id}`);
};

module.exports = {
  save,
  titles,
};
