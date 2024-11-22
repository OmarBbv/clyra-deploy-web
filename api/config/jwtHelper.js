const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const secret = user.role === "admin" ? process.env.ADMIN_JWT_SECRET : process.env.JWT_SECRET;
  return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "1h" });
};


const generateRefreshToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: "7d" } 
  );
};

module.exports = { generateToken, generateRefreshToken };