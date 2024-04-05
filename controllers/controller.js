/* eslint-disable nonblock-statement-body-position */
const NE = require("node-exceptions");
const { saveTitle, fetchTitles } = require("../services/service");
const { createJson } = require("../utils/app.helpers");
const { messages } = require("../utils/app.constant");

const save = async (req, res, next) => {
  try {
    await saveTitle(req.body);
    res.json(
      createJson(201, `Successfully inserted to ${req.body.collection} list`)
    );
  } catch (error) {
    next(error);
  }
};

const titles = async (req, res, next) => {
  try {
    const { user_id, collection } = { ...req.params, ...req.query };
    const titles = await fetchTitles({ user_id, collection });
    if (titles && titles.length)
      return res.json(
        createJson(200, `Successfully fetched ${collection} list`, titles)
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
