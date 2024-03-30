const config = require("config");
const mongooose = require("mongoose");

module.exports = (async function () {
  try {
    const options = {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // useCreateIndex: true
    };
    await mongooose.connect(config.get("MONGO_URL"), options);
    console.log("Connected to Mongo");

  } catch (error) {
    console.log("Error connecting to Mongo: ", error);
  }
})();
