const constants = require("../utils/constants");
const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUserService();

    if (users.status === constants.SUCCESS) {
      return res
        .status(users.status)
        .json({ message: users.message, users: users });
    } else {
      return res.status(users.status).json({ message: users.message });
    }
  } catch (error) {
    console.error("Internal server error", error);
    return res
      .status(constants.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const postUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const requestBody = {
      name,
      email,
      password,
    };
    const users = await userService.postUserService(requestBody, res);
    if (users.status === constants.RESOURCE_CREATED) {
      return res
        .status(users.status)
        .json({ message: users.message, users: users });
    } else {
      return res.status(users.status).json({ message: users.message });
    }
  } catch (error) {
    console.error("Internal server error", error);
    return res
      .status(constants.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const postUsersLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const requestBody = {
      email,
      password,
    };
    const users = await userService.postUserServiceLogin(requestBody, res);
    if (users.status === constants.SUCCESS) {
      return res
        .status(users.status)
        .json({ message: users.message, users: users });
    } else {
      return res.status(users.status).json({ message: users.message });
    }
  } catch (error) {
    console.error("Internal server error", error);
    return res
      .status(constants.SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = { getUsers, postUsers, postUsersLogin };
