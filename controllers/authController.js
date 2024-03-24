const userSchema = require("../models/user");

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
      res.status(201).send({
        user,
      });
    } catch (error) {
      ///
    }
  },
  login_post: async (req, res) => {
    const { email, parola } = req.body;
    res.send("kullanici giris");
  },
};
