const config = require("config");
const mongooose = require("mongoose");

module.exports = (async function () {
  try {
    const options = {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // useCreateIndex: true
    };
    const _connection = await mongooose.connect(
      config.get("MONGO_URL"),
      options
    );
    console.log(_connection);
    return _connection;
  } catch (error) {
    console.log("Error connecting to Mongo: ", error);
  }
})();
