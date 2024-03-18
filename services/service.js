const { insertOne } = require("../db/mongo.handler");

const saveTitle = async (payload) => {
  try {
    const row = await insertOne("user_titles_data", payload)
    console.log(row);
    return row;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveTitle,
};
