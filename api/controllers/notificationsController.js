const Notification = require("../models/NotificationModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const sendBulkNotification = asyncHandler(async (req, res) => {
  const { title, message } = req.body;
  const currentUser = req.user;

  if (currentUser.role !== "admin")
    return res
      .status(403)
      .json({ message: "Yalnızca adminler bildirim gönderebilir." });

  if (!message)
    return res
      .status(400)
      .json({ message: "Lütfen bir bildirim mesajı girin." });

  const users = await User.find({ role: "user" });

  const notifications = users.map((user) => {
    return new Notification({
      userId: user._id,
      title: title,
      message: message,
      read: false,
      createdAt: new Date(),
    });
  });

  await Notification.insertMany(notifications);

  return res.status(200).json({ message: "Bildirimler başarıyla gönderildi." });
});

const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const notifications = await Notification.find({ userId: userId });
    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Bildirimler alınırken hata:", error);
    return res
      .status(500)
      .json({ message: "Bildirimler alınırken bir hata oluştu." });
  }
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  const userId = req.user._id;

  try {
    const notification = await Notification.findOne({
      _id: notificationId,
      userId: userId,
    });

    if (!notification) {
      return res.status(404).json({ message: "Bildirim bulunamadı." });
    }

    notification.read = true;
    await notification.save();

    return res.status(200).json({ message: "Bildirim başarıyla okundu." });
  } catch (error) {
    console.error("Bildirim okuma hatası:", error);
    return res.status(500).json({ message: "Bir hata oluştu." });
  }
});

const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Oturum açmış kullanıcı ID'si

  try {
    // Kullanıcıya ait tüm bildirimleri güncelle
    const result = await Notification.updateMany(
      { userId: userId, read: false }, // Okunmamış bildirimler
      { $set: { read: true } } // Okundu olarak işaretle
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Okunacak bildirim yok." });
    }

    return res
      .status(200)
      .json({ message: "Tüm bildirimler başarıyla okundu." });
  } catch (error) {
    console.error("Bildirim okuma hatası:", error);
    return res.status(500).json({ message: "Bir hata oluştu." });
  }
});

module.exports = {
  sendBulkNotification,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};
