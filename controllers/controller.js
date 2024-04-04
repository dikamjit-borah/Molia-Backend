const NE = require("node-exceptions");
const { saveTitle, fetchTitles } = require("../services/service");
const { sendResponse, sendError, createJson } = require("../utils/app.helpers");
const { messages } = require("../utils/app.constant");

const save = async (req, res) => {
  res.send(await saveTitle(req.body));
};

const titles = async (req, res, next) => {
  try {
    const { user_id, entry_type } = { ...req.params, ...req.query };
    const titles = await fetchTitles({ user_id, entry_type });
    if (titles && titles.length)
      return res.json(
        createJson(200, `Successfully fetched ${entry_type} titles`, titles)
      );
    throw new NE.LogicalException(messages.not_found, 404);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  save,
  titles,
};
