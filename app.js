const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

//middlewares
app.use(express.static("public"));

app.set("view engine", "ejs");

const dbURI = process.env.dbURI;

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
