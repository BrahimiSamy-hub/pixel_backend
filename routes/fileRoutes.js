const express = require('express')
const router = express.Router()
const fileUploadController = require('../controllers/fileUploadController')
const userJwt = require('../middlewares/userJwt')

// Define routes

router.post('/upload', fileUploadController.uploadImage)
router.get('/', fileUploadController.getFiles)

module.exports = router
