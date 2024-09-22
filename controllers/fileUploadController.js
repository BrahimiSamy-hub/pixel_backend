const multer = require('multer')
const path = require('path')
const File = require('../models/file')
const fs = require('fs')
const fsPromises = fs.promises

// Temporary upload location
const tempUploadPath = 'uploads/temp'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(tempUploadPath, { recursive: true })
    cb(null, tempUploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage }).single('image')

const uploadImage = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })

    if (!req.file) {
      return res.status(400).send({ message: 'No file selected' })
    }

    // Create a new File document and get the ID
    const newFile = new File()
    const newFileId = newFile._id.toString()

    // Move the file from the temp location to the new folder
    const newFolderPath = `uploads/${newFileId}`
    fs.mkdirSync(newFolderPath, { recursive: true })

    const oldPath = req.file.path
    const newPath = path.join(newFolderPath, req.file.originalname)
    await fsPromises.rename(oldPath, newPath)

    newFile.url = newPath.replace(/\\/g, '/')
    await newFile.save()

    res.status(200).json({
      message: 'File uploaded and saved successfully',
      file: newFile,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: 'Error occurred during upload or database operation',
      error: error,
    })
  }
}

const getFiles = async (req, res) => {
  try {
    const files = await File.find()
    res.send(files)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error retrieving files' })
  }
}

module.exports = {
  uploadImage,
  getFiles,
}
