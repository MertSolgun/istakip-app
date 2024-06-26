const mongoose = require("mongoose");
const { isEmail } = require("validator");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email."],
    },
    parola: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Please enter minimum 6 characters."],
      set: (password) => passwordEncrypt(password),
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

module.exports = mongoose.model("userSchema", userSchema);
