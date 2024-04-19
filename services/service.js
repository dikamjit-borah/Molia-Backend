/* eslint-disable multiline-ternary */
const NE = require("node-exceptions");
const {
  find,
  findOne,
  findOneAndUpdate,
  insertOne,
  aggregate,
} = require("../db/mongo.handler");
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
    const { user_id, collection, sub_collection } = { ...data };
    if (collection === collections.custom) {
      return await fetchSubCollectionTitles(sub_collection, user_id);
    }
    const document = await findOne(collection, { user_id });
    return document?.titles;
  } catch (error) {
    console.log(`Error fetching titles for ${data.user_id}: ${error}`);
    throw error;
  }
};

const fetchSubCollectionTitles = async (sub_collection, user_id) => {
  try {
    if (!sub_collection)
      throw new NE.InvalidArgumentException(
        `Bad Request: sub_collection is not defined`,
        400
      );
    const projection = {};
    projection[sub_collection] = 1;
    const document = await find(collections.custom, { user_id }, projection);
    return document[0][sub_collection]?.titles;
  } catch (error) {
    console.log(`Error fetching ${sub_collection} for ${user_id}: ${error}`);
    throw error;
  }
};

const fetchSubCollections = async (user_id) => {
  try {
    // Aggregation pipeline to project only the parent's objects
    const pipeline = [
      { $match: { user_id } },
      { $project: { arrayofkeyvalue: { $objectToArray: "$$ROOT" } } },
      { $project: { keys: "$arrayofkeyvalue.k" } },
    ];

    const document = await aggregate("custom", pipeline);
    return document[0].keys.filter((key) => key !== "_id" && key !== "user_id");
  } catch (error) {
    console.log(`Error fetching titles for ${user_id}: ${error}`);
    throw error;
  }
};

module.exports = {
  saveTitle,
  fetchTitles,
  fetchSubCollections,
};
