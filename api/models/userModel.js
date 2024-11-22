const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    interests: {
      type: String,
    },
    occupation: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    mobile: {
      type: String,
      required: true,
    },
    profileImg: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passwordResetToken = resetToken;
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
