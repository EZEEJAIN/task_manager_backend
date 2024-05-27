const express = require("express");
const {
  getUsers,
  postUsers,
  postUsersLogin,
} = require("../controller/userController");

const router = express.Router();

router.get("/users", getUsers);
router.post("/signup", postUsers);
router.post("/login", postUsersLogin);
// router.patch("/users", updateUsers)
// router.delete("/users", getUsers)

module.exports = router;
