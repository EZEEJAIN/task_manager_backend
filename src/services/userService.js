const constants = require("../utils/constants");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUserService = async () => {
  try {
    const users = await User.find({});
    return {
      users: users,
      status: constants.SUCCESS,
      message: "Users fetched successfully",
    };
  } catch (error) {
    console.error(error);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};

const postUserService = async (requestBody, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(requestBody.password, salt);

    const user = new User({ ...requestBody, password: hashPassword });

    const authToken = await user.generateAuthToken();
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    res.cookie("jwtToken", authToken, {
      expires: new Date(Date.now() + sevenDaysInMilliseconds),
    });

    const createdUser = await user.save();
    return {
      users: createdUser,
      status: constants.RESOURCE_CREATED,
      message: "User saved successfully",
    };
  } catch (error) {
    console.error("ERROR", error.message);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};

const postUserServiceLogin = async (requestBody,res) => {
  try {
    const validUser = await User.findOne({
      email: requestBody.email,
    });

    if (!validUser) {
      return {
        status: constants.NOT_FOUND,
        message: "User not found",
      };
    }
    if (requestBody.password.length === 0) {
      return {
        status: constants.BAD_REQUEST,
        message: "Password is required",
      };
    }
    const isMatchPassword = await bcrypt.compare(
      requestBody.password,
      validUser.password
    );
    if (isMatchPassword) {
      const authToken = await validUser.generateAuthToken();
      const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

      res.cookie("jwtToken", authToken, {
        expires: new Date(Date.now() + sevenDaysInMilliseconds),
      });

      return {
        users: validUser,
        status: constants.SUCCESS,
        message: "User login successfully",
      };
    } else {
      return {
        status: constants.UNAUTHORISED,
        message: "Invalid login credentials, please try again...",
      };
    }
  } catch (error) {
    console.error("ERROR", error.message);
    return { status: constants.BAD_REQUEST, message: error.message };
  }
};
module.exports = { getUserService, postUserService, postUserServiceLogin };
