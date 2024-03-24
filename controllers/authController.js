const userSchema = require("../models/user");
const jtw = require("jsonwebtoken");
require("dotenv").config();

//JTW
const maxAGE = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jtw.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAGE,
  });
};

//ErrorHandler

const errorHandler = (err) => {
  let errors = { email: "", parola: "" };
  if (err.code === 11000) {
    errors.email = "This email address is already registered.";
    return errors;
  }
};

module.exports = {
  signup_get: (req, res) => {
    res.render("signup");
  },
  login_get: (req, res) => {
    res.render("login");
  },
  signup_post: async (req, res) => {
    const { email, parola } = req.body;
    try {
      const user = await userSchema.create({ email, parola });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAGE: maxAGE });
      res.status(201).send({
        error: false,
        user,
      });
    } catch (error) {
      const errors = errorHandler(error);
      res.status(400).json({ errors });
      ///
    }
  },
  login_post: async (req, res) => {
    const { email, parola } = req.body;
    res.send("kullanici giris");
  },
};
