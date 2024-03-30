require("dotenv").config();

const express = require("express");
const parser = require("body-parser");
const routes = require("./routes/route");
const _mongo = require("./db/mongo.connection");

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
const port = 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
