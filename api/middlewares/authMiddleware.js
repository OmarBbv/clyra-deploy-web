const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' })
  }

  try {
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
    }

    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

const adminMiddleware = async (req, res, next) => {
  await authMiddleware(req, res, async () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' })
    }
    next()
  })
}

module.exports = { authMiddleware, adminMiddleware }
