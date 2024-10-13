const express = require('express')
const router = express.Router()
const posterController = require('../controllers/posterController')
const userJwt = require('../middlewares/userJwt')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Append the file extension
  },
})

// Initialize the upload middleware
const upload = multer({ storage: storage })

// Define routes
router.get('/:id', posterController.getSinglePoster)
router.post(
  '/',

  upload.array('images', 15),
  posterController.createPoster
)
router.get('/', posterController.getPosters)
router.put(
  '/:id',

  upload.array('images', 15),
  posterController.updatePoster
)
router.delete('/:id', posterController.deletePoster)

module.exports = router
