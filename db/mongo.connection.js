const config = require("config");
const mongooose = require("mongoose");

module.exports = (async function () {
  try {
    const options = {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // useCreateIndex: true
    };
    mongooose
      .connect(config.get("MONGO_URL"), options)
      .then((res) => {
        console.log("Connected to Mongo: ", res.now());
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.log("Error connecting to Mongo: ", error);
  }
})();
