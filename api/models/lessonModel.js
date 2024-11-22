const mongoose = require("mongoose");
const slugify = require("slugify");

const LessonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

LessonSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

LessonSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Lesson", LessonSchema);
