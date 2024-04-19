const mongoose = require("mongoose");
const db = mongoose.connection;

module.exports = {
  find: async (collection, query, projection) => {
    try {
      if (!db) {
        throw new Error("No db found to perform query");
      }
      return await db
        .collection(collection)
        .find(query)
        .project(projection)
        .toArray();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

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

  findOneAndUpdate: async (collection, query, data) => {
    try {
      if (!db) {
        throw new Error("No db found to perform query");
      }
      return await db.collection(collection).findOneAndUpdate(query, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  aggregate: async (collection, pipeline) => {
    try {
      const result = await db
        .collection(collection)
        .aggregate(pipeline)
        .toArray();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
