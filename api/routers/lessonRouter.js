const express = require("express");
const router = express.Router();
const {
  createLessons,
  getLessonsById,
  getAllLessons,
  updateLesson,
  deleteLesson,
  getFilteredLessons,
} = require("../controllers/lessonController");
const {
  adminMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.post("/post", authMiddleware, adminMiddleware, upload, createLessons);
router.get("/", getAllLessons);
router.get("/filtered-lessons", getFilteredLessons);
router.put("/", authMiddleware, adminMiddleware, upload, updateLesson);
router.get("/:id", getLessonsById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteLesson);

module.exports = router;
