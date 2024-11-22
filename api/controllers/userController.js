const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const sendEmail = require('../config/sendEmail')
const crypto = require('crypto')
const { generateToken, generateRefreshToken } = require('../config/jwtHelper')

const createUser = asyncHandler(async (req, res) => {
  const { email, password, name, surname, mobile } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Kullanıcı zaten mevcut' })
  }

  const newUser = await User.create({ email, password, name, surname, mobile })

  req.logIn(newUser, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }

    const token = generateToken(newUser._id)
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      token: token,
    })
  })
})

const login = asyncHandler((req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    if (!user) {
      return res.status(401).json({ message: info.message })
    }

    req.logIn(user, async (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: loginErr.message })
      }

      const refreshToken = generateRefreshToken(user._id)
      user.refreshToken = refreshToken
      await user.save()

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      })

      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        mobile: user.mobile,
        token: generateToken(user._id),
        role: user.role,
      })
    })
  })(req, res, next)
})

const logout = asyncHandler((req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'Çıkış başarılı' })
  })
})

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const updates = req.body

  try {
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id

  try {
    const user = await User.findById(userId).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      mobile: user.mobile,
      profileImg: user.profileImg || null,
      location: user.location || null,
      interests: user.interests || null,
      occupation: user.occupation || null,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const verificationCode = crypto.randomBytes(3).toString('hex')

  try {
    await sendEmail(email, verificationCode)
    res.status(200).json({ message: 'Verification code sent to your email.' })
  } catch (error) {
    res.status(500).json({ message: 'Error sending email.' })
  }
})

module.exports = {
  createUser,
  login,
  logout,
  updateUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  forgotPassword,
}
