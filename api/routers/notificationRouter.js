const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const { sendBulkNotification, getNotifications, markNotificationAsRead, markAllNotificationsAsRead } = require("../controllers/notificationsController");

router.post(
  "/send-bulk-notification",
  authMiddleware, 
  adminMiddleware, 
  sendBulkNotification
);

router.get("/", authMiddleware, getNotifications);

router.patch(
  "/notifications/:notificationId/read",
  authMiddleware, 
  markNotificationAsRead
);

router.patch(
  "/read-all",
  authMiddleware,
  markAllNotificationsAsRead 
);

module.exports = router;
