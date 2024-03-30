const MONGO_URL = process.env.MONGO_URL;
const mongooose = require("mongoose");

module.exports = (async function () {
  try {
    const options = {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // useCreateIndex: true
    };
    await mongooose.connect(MONGO_URL, options);
    console.log("Connected to Mongo");
  } catch (error) {
    console.log("Error connecting to Mongo: ", error);
  }
})();
