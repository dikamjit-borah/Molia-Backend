const { insertOne, findOne, findOneAndUpdate } = require("../db/mongo.handler");

const saveTitle = async (payload) => {
  try {
    const collection = payload.entry_type;
    const user_id = payload.user_id;
    const details = payload.details;
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
    console.log(`Error saving title for ${payload.user_id}: ${error}`);
  }
};

module.exports = {
  saveTitle,
};
