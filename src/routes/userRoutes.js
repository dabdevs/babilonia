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

// Get All Users
router.get("/", getUsers);

// Get One User
router.get("/:id", getUser);

// Create A User
router.post("/", createUser);

// Update A User
router.put("/:id", updateUser);

// Delete A User
router.delete("/:id", deleteUser);

module.exports = router;
