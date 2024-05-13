const express = require("express");
const { getUsers } = require("../controller/userController");

const router = express.Router();

router.get("/users", getUsers)
// router.post("/users", getUsers)
// router.put("/users", getUsers)
// router.delete("/users", getUsers)

module.exports = router;
