const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  updateUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  createUser,
  forgotPassword,
} = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.put("/update-profile", authMiddleware, upload, updateUser);
router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/me", authMiddleware, getUserProfile);
router.get("/:id", authMiddleware, getUserById);
router.post("/forgot-password", forgotPassword);


module.exports = router;
