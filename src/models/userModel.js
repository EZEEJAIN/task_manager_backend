const mongoose = require("mongoose");
const validator = require("validator");
const jwt=require('jsonwebtoken')
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    authToken: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async () => {
  try {
    const token = jwt.sign(
      {
        _id: this?.id?.toString(),
      },
      process.env.JWT_SECRET_KEY
    );
    this.authToken = this?.authToken?.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model("User", userSchema);

module.exports = User;
