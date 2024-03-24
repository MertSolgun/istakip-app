const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

//Db connection
const dbUri = process.env.dbUri;
mongoose
  .connect(dbUri)
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

app.use(require("./routes/authRoutes"));

//Cookies
app.get("/set-cookies", (req, res) => {
  res.cookie("yeni", false);
  res.cookie("parola", "12345", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send("cookie olustu");
});

app.get("/get-cookies", (req, res) => {
  const cookies = req.cookies;
  res.json(cookies);
});
