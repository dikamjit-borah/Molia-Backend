require("dotenv").config();

const os = require("os");
const express = require("express");
const parser = require("body-parser");
const routes = require("./routes/route");
require("./db/mongo.connection")();

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

app.use(require("./middlewares/response.middleware"));
app.use("/v1", routes);
app.use(require("./middlewares/error.middleware"));

app.listen(port, () => {
  console.log(os.networkInterfaces());
  console.log(`Molio-Backend is running on port ${port}`);
});
