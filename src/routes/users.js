const { Router } = require("express");

// Controllers
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

// Get and create user
router.route("/").get(getUsers).post(createUser);

// Get One User
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
