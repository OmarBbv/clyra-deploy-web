const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dcwvc9dwu',
  api_key: '837515429863236',
  api_secret: '3brZb_Ly7KlNWx7hMn3I4HU_yC0',
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
  },
})

const upload = multer({ storage }).single()

module.exports = upload
