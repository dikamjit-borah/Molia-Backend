const { saveTitle, fetchTitles } = require("../services/service");
const { sendResponse, sendError, createJson } = require("../utils/app.helpers");

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
    throw new Error("Not found");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  save,
  titles,
};
