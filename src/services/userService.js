const constants = require("../utils/constants");

const getUsers = async () => {
    try {
        const users = [
            {
                id: 1,
                name: "Amam",
                email: "aman.khandelwal1205@gmail.com"
            },
            {
                id: 2,
                name: "Ezee",
                email: "ezee.jain@gmail.com"
            }
        ]

        //   return { users: users, status: constants.SUCCESS, message: "Users fetched successfully" };
        return { allUsers: users, status: 200, message: "Users fetched successfully" };
    } catch (error) {
        console.error(error);
        //   return { status: constants.BAD_REQUEST, message: "Failed to fetch roles." }
        return { users: [], status: 500, message: "Failed to fetch users." }
    }
}

module.exports = { getUsers };
