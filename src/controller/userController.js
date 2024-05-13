const constants = require("../utils/constants");
const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {

    const users = await userService.getUsers();

    // if (users.status === constants.SUCCESS) {
    //   return res.status(users.status).json({ message: users.message, users: users });
    // } else {
    //   return res.status(users.status).json({ message: users.message });
    // }

    return res.status(users.status).json({ data: users });

  } catch (error) {
    console.error("Internal server error", error);
    // return res.status(constants.SERVER_ERROR).json({ message: 'Internal server error' });
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getUsers };
