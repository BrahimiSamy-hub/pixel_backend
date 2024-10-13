const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    arName: {
      type: String,
      required: true,
    },
    frName: {
      type: String,
      required: true,
    },
    engName: {
      type: String,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
  },
  { timestamps: true, versionKey: false }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
