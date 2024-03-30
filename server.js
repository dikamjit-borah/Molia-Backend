require("dotenv").config();

const os = require("os");
const express = require("express");
const parser = require("body-parser");
const routes = require("./routes/route");
const _mongo = require("./db/mongo.connection");

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

app.use("/v1", routes);

app.listen(port, () => {
  console.log(os.networkInterfaces());
  console.log(`Molio-Backend is running on port ${port}`);
});
