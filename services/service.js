const { insertOne, findOne, findOneAndUpdate } = require("../db/mongo.handler");

const saveTitle = async (data) => {
  try {
    const collection = data.entry_type;
    const user_id = data.user_id;
    const details = data.details;
    const document = await findOne(collection, { user_id });
    if (!document) {
      return await insertOne(collection, { user_id, titles: [details] });
    }
    document.titles.push(details);

    // Update the document in the database
    return await findOneAndUpdate(
      collection,
      { user_id },
      { $set: { titles: document.titles } }
    );
  } catch (error) {
    console.log(`Error saving title for ${data.user_id}: ${error}`);
    throw error;
  }
};

const fetchTitles = async (data) => {
  try {
    const collection = data.entry_type;
    const user_id = data.user_id;
    const document = await findOne(collection, { user_id });
    return document?.titles;
  } catch (error) {
    console.log(
      `Error fetching ${data.entry_type} titles for ${data.user_id}: ${error}`
    );
    throw error;
  }
};

module.exports = {
  saveTitle,
  fetchTitles,
};
