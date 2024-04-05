/* eslint-disable multiline-ternary */
const { insertOne, findOne, findOneAndUpdate } = require("../db/mongo.handler");
const { collections } = require("../utils/app.constant");

const saveTitle = async (data) => {
  try {
    const { user_id, collection, sub_collection, details } = { ...data };

    const document = await findOne(collection, { user_id });

    if (collection === collections.custom) {
      return saveForCustomList(
        document,
        user_id,
        collection,
        sub_collection,
        details
      );
    }

    //save for pre-defined lists
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

const saveForCustomList = async (
  document,
  user_id,
  collection,
  sub_collection,
  details
) => {
  if (!document) {
    const data = { user_id };
    data[sub_collection] = { titles: [details] };
    return await insertOne(collection, data);
  }
  // Check if the sub_collection exists in the document
  if (!document[sub_collection]) {
    // If not, create it with the provided details
    document[sub_collection] = { titles: [details] };
  } else {
    // If it exists, push the details to the titles array
    document[sub_collection].titles.push(details);
  }

  // Update the document in the database
  return await findOneAndUpdate(
    collection,
    { user_id },
    { $set: { [sub_collection]: document[sub_collection] } }
  );
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
