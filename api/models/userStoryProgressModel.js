const mongoose = require('mongoose');

const userStoryProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lessons', required: true },
  storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('UserStoryProgress', userStoryProgressSchema);
