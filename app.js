const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

//middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");

//Db connection
const dbURI = process.env.dbURI;
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, () => {
      console.log("Db connection");
    })
  )
  .catch((err) => console.log(err, "Db not connection"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/works", (req, res) => {
  res.render("works");
});
