const express = require("express");
const router = express.Router();
const {
  createStory,
  getStoryById,
  updateStory,
  getAllStory,
  getStoriesByLessonId,
  allSearch,
  getTopViewedStories,
  searchStories,
} = require("../controllers/storyController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

router.get("/search", allSearch);
router.get("/suggestions", getTopViewedStories);
router.get("/search", searchStories );

router.get("/", getAllStory);
router.post("/",authMiddleware, adminMiddleware, createStory);
router.get("/:id", getStoryById);
router.put("/",authMiddleware, adminMiddleware, updateStory);
router.get("/all/:id", getStoriesByLessonId);

module.exports = router;
