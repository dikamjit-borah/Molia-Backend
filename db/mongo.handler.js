const mongoose = require("mongoose");
const db = mongoose.connection;

module.exports = {
  findOne: async (collection, query, projection) => {
    try {
      if (!db) {
        throw new Error("No db found to perform query");
      }
      return await db.collection(collection).findOne(query, projection);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  insertOne: async (collection, data) => {
    try {
      if (!db) {
        throw new Error("No db found to perform query");
      }
      return await db.collection(collection).insertOne(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteOne: async (collection, data) => {
    try {
      if (!db) {
        throw new Error("No db found to perform query");
      }
      return await db.collection(collection).deleteOne(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
